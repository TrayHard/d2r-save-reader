# Data type

Types are the fundamental entity defining how a certain region of memory should be interpreted, formatted and displayed.

## Built-in Types

### Unsigned Integers

Unsigned integer types represent regular binary numbers. They are displayed as a integer value ranging from `0` to `(2^(8*Size) - 1)`.

Name - Size
u8 - 1 Byte
u16 - 2 Bytes
u24 - 3 Bytes
u32 - 4 Bytes
u48 - 6 Bytes
u64 - 8 Bytes
u96 - 12 Bytes
u128 - 16 Bytes

### Signed Integers

Signed integer types represent signed binary numbers in Two's Complement representation. They are displayed as a integer value ranging from `-(2^(8*Size) - 1)` to `(2^(8*Size) - 1)`.

Name - Size
s8 - 1 Byte
s16 - 2 Bytes
s24 - 3 Bytes
s32 - 4 Bytes
s48 - 6 Bytes
s64 - 8 Bytes
s96 - 12 Bytes
s128 - 16 Bytes

### Floating points

Floating Point types represent a floating pointer number. On most modern platforms this is IEEE754 but it's not guaranteed.

Name - Size
float - Unspecified (4 Bytes, IEEE754 usually)
double - Unspecified (8 Bytes, IEEE754 usually)

### Special

Name - Size - Description
char - 1 Byte - ASCII Character
char16 - 2 Bytes - UTF-16 Wide Character
bool - 1 Byte - Boolean value true/false
str - Varying - Heap allocated String, can only be used in functions
auto - Varying - Automatic type inferring, can only be used in functions

## Endianness

By default all built-in types are interpreted in native endianness. Meaning if the runtime is running on a little endian machine, all types will be treated as little endian. On a big endian machine they will be treated as big endian.

However it’s possible to override this default on a global, per-type or per-variable basis. Simply prefix any type with the le for little endian or be for big endian keyword:

```
le u32 myUnsigned;  // Little endian 32 bit unsigned integer
be double myDouble; // Big endian 64 bit double precision floating point
s8 myInteger;       // Native endian 8 bit signed integer
```

But you can also set up endianess globally like that - `#pragma endian little`

## Literals

Literals are fixed values representing a specific constant. The following literals are available:

Type - Example
Decimal Integer - `42`, `-1337`
Unsigned 32 bit integer - `69U`
Signed 32 bit integer - `69`, `-123`
Hexadecimal Integer - `0xDEAD`
Binary Integer - `0b00100101`
Octal Integer - `0o644`
Float - `1.414F`
Double - `3.14159`, `1.414D`
Boolean - `true`, `false`
Character - `'A'`
String - `"Hello World"`

## Enums

Enums are a data type that consist of a set of named constants of a specific size.

They are particularly useful for associating meaning to a value found in memory. Defining an enum works similar to other C-like languages. The first entry in the enum will be associated the value 0x00 and each following one will count up from there. If an entry has an explicit value assigned to it, every entry following it will continue counting from there.

```
enum StorageType : u16 {
  Plain,    // 0x00
  Compressed = 0x10,
  Encrypted // 0x11
};
```

The type following the colon after the enum name declares the enum’s underlying type and can be any built-in datatype. This type only affects the enum’s size.

### Enum range

Sometimes, a range of values can refer to the same enum value, in which case enum ranges can be useful. Enum ranges will cause all values inside of the specified range to be visualized as that enum entry. When using a range value in a mathematical expression, it will yield the start value of the range.

```
enum NumberType : u16 {
  Unsigned      = 0x00 ... 0x7F,
  Signed        = 0x80,
  FloatingPoint = 0x90
};
```

## Arrays

Arrays are a contiguous collection of one or more values of the same type.

### Constant sized array

A constant size can be specified by entering the number of entries in the square brackets. This value may also name another variable which will be read to get the size.

`u32 array[100] @ 0x00;`

### Unsized array

It’s possible to leave the size of the array empty in which case it will keep on growing until it hits an entry which is all zeros.

`char string[] @ 0x00;`

### Loop sized array

Sometimes arrays need to keep on growing as long as a certain condition is met. The following array will grow until it hits a byte with the value 0xFF.

`u8 string[while(std::mem::read_unsigned($, 1) != 0xFF)] @ 0x00;`

### Optimized arrays

Big arrays take a long time to compute and take up a lot of memory. Because of this, arrays of built-in types are automatically optimized to only create one instance of the array type and move it around accordingly.

The same optimization can be used for custom types by marking them with the `[[static]]` attribute. However this can only be done if the custom type always has the same size and same memory layout. Otherwise results may be invalid!

### Strings

char and char16 types act differently when they are used in an array. Instead of displaying as an array of characters, they are displayed as a String instead; terminated by a null byte in the following example.

```
char myCString[];
char16 myUTF16String[];
```

## Pointers

Pointers are variables that treat their value as an address to find the address of the value they are pointing to.

`u16 *pointer : u32 @ 0x08;`

This code declares a pointer whose address is a u32 and points to a u16.

`u32 *pointerToArray[10] : s16 @ 0x10;`

This code declares a pointer to an array of 10 u32's and the pointer has a size of s16

The address will always be treated as absolute. Make sure to set the base address of your data correctly in order for pointers to work as intended.

## Bitfields

Bitfields are similar to structs but they address individual, unaligned bits instead. They can be used to decode bit flags or other types that use less than 8 bits to store a value.

```
bitfield Permission {
  r : 1;
  w : 1;
  x : 1;
};
```

Each entry inside of a bitfield consists of a field name followed by a colon and the size of the field in bits. A single field cannot occupy more than 64 bits.

Bitfields can also be nested or used as arrays inside of other bitfields. In this case, alignment rules do not apply within the bitfield but only once the outer-most bitfield is placed within a struct type.

### Bitfield field types

By default, every bitfield field is interpreted as a unsigned value, however it's also possible to interpret it as a signed number, boolean or enum as well.

```
bitfield TestBitfield {
    regular_value           : 4;    // Regular field, regular unsigned value
    unsigned unsigned_value : 5;    // Unsigned field, same as regular_value
    signed   signed_value   : 4;    // Signed field, interpreting the value as two's complement
    bool     boolean_value  : 1;    // Boolean field,
    TestEnum enum_value     : 8;    // Enum field, displays the enum value corresponding to that value
};
```

Besides this, it's also possible to interleave regular types with bitfield fields

```
bitfield InterleavedBitfield {
    field_1 : 4;
    field_2 : 2;
    u16 regular_value;
};
```

Using full sized fields in a bitfield will always cause the current bit offset within the bitfield to be aligned to the next full byte boundary.

### Padding

It’s also possible to insert padding in between fields using the padding syntax.

```
bitfield Flags {
  a : 1;
  b : 2;
  padding : 4;
  c : 1;
};
```

This inserts a 4 bit padding between field b and c.

## Structs

Structs are data types that bundle multiple variables together into one single type.

A very simple struct for a 3D vector of floats might look like this:

```
struct Vector3f {
  float x, y, z;
};
```

Placing it into memory using the placement syntax will place all members of the struct directly adjacent to each other starting at the specified address.

### Padding

By default there’s no padding between struct members. This is not always desired so padding can be inserted manually if needed using the padding keyword.

```
struct Vector3f {
  float x;
  padding[4];
  float y;
  padding[8];
  float z;
};
```

This code will insert a 4 byte padding between the members x and y as well as a 8 byte padding between y and z.

### Inheritance

Inheritance allows copying all members of the parent struct into the child struct, making them available there.

```
struct Parent {
  u32 type;
  float value;
};

struct Child : Parent {
  char string[];
};
```

The struct Child now contains type, value and string.

### Anonymous members

It’s possible to declare variables inside of structs or unions without giving them a name. This is useful when you know that there’s a pattern of a certain type at this offset but the name of the variable is not known yet or isn’t important.

```
struct MyStruct {
  u32;
  float;
  MyOtherStruct;
};
```

### Conditional parsing

The pattern language provides advanced features that allow for much more complex struct definitions, these features are detailed on the Control Flow section.

## Unions

Unions are similar to structs in that they bundle multiple variables together into a new type, however instead of these variables being placed consecutively, they all share the same start address.

This can be useful to interpret and inspect data as multiple different types as shown here:

```
union Converter {
  u32 integerData;
  float floatingPointData;
};
```

## Using declarations

Using declarations are useful to give existing types a new name and optionally add extra specifiers to them. The following code creates a new type called Offset which is a big endian 32 bit unsigned integer. It can be used in place of any other type now.

`using Offset = be u32;`

## Forward declaration

When having two types that recursively reference each other, it’s required to forward declare one of the types so all types are known to the runtime when needed.

This can be done with the `using TypeName;` syntax.

```
// Tell the language that there will be a type named B in the future so if it encounters
// a variable with this type, it has to postpone the parsing until the type has been declared
using B;

struct A {
  bool has_b;

  if (has_b)
    B b;
};

struct B {
  bool has_a;

  if (has_a)
    A a;
};
```

## Templates

Templates can be used to substitute parts of a custom type’s member’s types with placeholders which can then be defined later on when instantiating this type.

Templates can be used with struct, union and using declarations:

```
struct MyTemplateStruct<T> {
  T member;
};

union MyTemplateStruct<Type1, Type2> {
  Type1 value1;
  Type2 value2;
};

using MyTemplateUsing<Type1> = MyTemplateStruct<Type1, u32>;
```

These templates can then be used to create concrete types:

`MyTemplateStruct<u32, u64> myConcreteStruct @ 0x00;`

### Non-Type Template Parameters

It’s also possible to use templates to pass expressions to types. Examples for this are numbers, strings or variables (including custom types).

To mark a template parameter as a non-type template parameter, use the auto keyword.

```
struct Array<T, auto Size> {
  T data[Size];
};

Array<u32, 0x100> array @ 0x00;
```

### Pattern local variables

It’s possible to declare local variables inside of patterns that don’t show up in the final type but can be used to store information for later use. To declare a local variable, simply initialize it with a value using the = operator.

```
struct MyType {
    u32 x, y, z; // Regular members
    float localVariable = 0.5; // Local variable
};
```

=============

# Variable Placement

## Variables

In order for the runtime to start decoding data, variables need to be placed somewhere in the binary data. To do this the variable placement syntax is used:

`u32 myPlacedVariable @ 0x110;`

This creates a new unsigned 32 bit variable named myPlacedVariable and places it at address `0x110`.

The runtime will now treat the 4 bytes starting at offset `0x110` as a u32 and decodes the bytes at this address accordingly. Placing variables isn’t limited to just built-in types. All types, even custom ones like structs, enums, unions, etc, can be placed.

## Global variables

Sometimes it’s necessary to store data globally while the pattern is running. For this global variables can be used. The syntax is the same as with placed variables but without the @ placement instruction at the end.

`u32 globalVariable;`

## Calculated pointers

The same placement syntax may also be used inside of structs to specify where patterns are supposed to be placed in memory. These variables do not contribute to the overall size of the struct they are placed within.

=============

# Namespaces

Namespaces provide a way to encapsulate and group multiple similar types together. They also allow for multiple types in different namespaces to be named the same without interfering with each other.

```
namespace abc {

    struct Type {
        u32 x;
    };

}

abc::Type type1 @ 0x100;

using Type = abc::Type;
Type type2 @ 0x200;
```

To access a type within a namespace, the scope resolution operator `::` is used. In the example above, to access the type `Type` inside the namespace `abc`, `abc::Type` is used.

=============

# Expressions

## Operators

Operator - Description
`a + b` - Addition
`a - b` - Subtraction
`a * b` - Multiplication
`a / b` - Division
`a % b` - Modulus
`a >> b` - Bitshift right
`a << b` - Bitshift left
`~a` - Bitwise NOT
`a & b` - Bitwise AND
`a | b` - Bitwise OR
`a ^ b` - Bitwise XOR
`a == b` - Equality comparison
`a != b` - Inequality comparison
`a > b` - Greater-than comparison
`a < b` - Less-than comparison
`a >= b` - Greater-than-or-equals comparison
`a <= b` - Less-than-or-equals comparison
`!a` - Boolean NOT
`a && b` - Boolean AND
`a || b` - Boolean OR
`a ^^ b` - Boolean XOR
`a ? b : c` - Ternary
`(a)` - Parenthesis
`function(a)` - Function call

`a`, `b` and `c` can be any numeric literal or another expression.

## Type Operators

Type Operators are operators that work on types. They can only be used on a variable, not on a mathematical expression.

Operator - Description
`addressof(a)` - Address of variable
`sizeof(a)` - Size of variable

`a` can be a variable, either by naming it directly or finding it through member access

### PROVIDER OPERATORS

`a` can also be replaced with the `$` operator to query information about the loaded data

Operator - Description
`addressof($)` - Base address of the loaded data
`sizeof($)` - Size of the loaded data

## String Operators

String operators are any operators acting on strings directly.

Operator - Description
`a + b` - String concatenation
`str * number` - String repetition
`a == b` - Lexical equality
`a != b` - Lexical inequality
`a > b` - Lexical greater-than
`a >= b` - Lexical greater-than-or-equals
`a < b` - Lexical less-than
`a <= b` - Lexical less than-or-equals

## Member Access

Member access is the act of accessing members inside a struct, union or bitfield or referencing the index of an array to access its value.

Below the simplest operations are shown, however they may be concatenated and extended indefinitely as suitable.

Operation - Access type
`structVar.var` - Accessing a variable inside a struct, union or bitfield
`arrayVar[x]` - Accessing a variable inside an array
`parent.var` - Accessing a variable inside the parent struct or union of the current struct or union
`this` - Referring to the current pattern. Can only be used inside of a struct or union

## `$` Dollar Operator

The Dollar Operator is a special operator which expands to the current offset within the current pattern.

```
#pragma base_address 0x00

std::print($); // 0
u32 x @ 0x00;
std::print($); // 4
```

It’s also possible to assign a value to the dollar operator to change the current cursor position.

`$ += 0x100;`

The dollar operator can also be used to access single bytes of the main data.

`std::print($[0]); // Prints the value of the byte at address 0x00`

## Casting Operator

The cast operator changes the type of an expression into another.

```
fn test(float x) {
    return 1 + u32(x);
}

test(3.14159); // 4
```

=============

# Functions

Functions are reusable pieces of code that can do calculations. Pretty much like functions in any other programming language.

Parameter types need to be specified explicitly, return type is automatically deduced.

```
fn min(s32 a, s32 b) {
    if (a > b)
        return b;
    else
        return a;
};

std::print(min(100, 200)); // 100
```

## Global Scope

The global scope for the most part, works the same as a function. All statements in the global scope will get executed when the program is executed. The only difference is that new types can be defined in the global scope.

## Parameter packs

To allow passing an unlimited number of parameters to functions, parameter packs can be used.

```
fn print_sequence(auto first, auto ... rest) {
    std::print("{}", first);

    if (std::sizeof_pack(rest) > 0)
        print_sequence(rest);
};

print_sequence(1, 2, 3, 4, 5, 6);
```

Parameter packs can exclusively be used as arguments to other functions. Using them automatically expands them acting as if the contained values get passed to the other function individually.

The above function will print out all passed values in sequence by printing the first parameter and then removing it by not passing it on to the function during the next run.

## Default parameters

Default parameters can be used to set a default value for parameters, if they weren't provided when the function got called.

```
fn print_numbers(u32 a, u32 b, u32 c = 3, u32 d = 4) {
    std::print("{} {} {} {}", a, b, c, d);
};

print_numbers(1, 2);            // Prints 1 2 3 4
print_numbers(8, 9, 10, 11);    // Prints 8 9 10 11
```

## Reference parameters

Reference parameters can be used to avoid unnecessarily copying lots of data around and are helpful when needing to pass custom types that do not have a fixed layout to a function. Instead of copying the given parameter value onto the function’s heap, a reference to the existing pattern is instead used.

```
struct MyString {
    char value[while(std::mem::read_unsigned($, 1) != 0xFF)];
};

fn print_my_string(ref MyString myString) {
    std::print(myString.value);
};
```

## Variables

Variables can be declared in a similar fashion as outside of functions but they will be put onto the function’s stack instead of being highlighted.

```
fn get_value() {
    u32 value;
    u8 x = 1234;

    value = x * 2;

    return value;
};
```

Custom types may also be used inside of functions

```
union FloatConverter {
    u32 integer;
    float floatingPoint;
};

fn interpret_as_float(u32 integer) {
    FloatConverter converter;

    converter.integer = integer;
    return converter.floatingPoint;
};
```

It is also possible to declare constants using the const keyword

```
fn get_value() {
    const u32 value = 1234;
    return value;
};

std::print("{}", get_value()); // 1234
```

## Control statements

### If-Else-Statements

If, Else-If and Else statements work the same as in most other C-like languages. When the condition inside a `if` head evaluates to true, the code in its body is executed. If it evaluates to false, the optional `else` block is executed.

Curly braces are optional and only required if more than one statement is present in the body.

```
if (x > 5) {
    // Execute when x is greater than 5
} else if (x == 2) {
    // Execute only when x is equals to 2
} else {
    // Execute otherwise
}
```

### While-Loops

While loops work similarly to if statements. As long as the condition in the head evaluates to true, the body will continuously be executed.

```
while (check()) {
    // Keeps on executing as long as the check() function returns true
}
```

### For-Loops

For loops are another kind of loop similar to the while loop. Its head consists of three blocks (ex. `i < 10`) that are separated by commas.

The first block is for declaring an iterating variable. This variable can only be used inside of the for loop. The value that this variable is declared as is the iteration that it starts at. In the given example, the first block is `u8 i = 0`.

The second block is a condition used to determine when the loop should run again, and when it should stop. Every time the loop repeats, this condition is checked. In the given example, the second block is `i < 10`. At the start of each loop, the current value of `i` is checked to see if it is still less than `10`. When `i` becomes `10` or greater, the loop will stop executing. As long as the statement in this block resolves to true, the loop will continue.

The third block only executes after the body of the loop. It assigns the iterating variable a new number, one that is incremented by a specified amount - in short, it increments the iterating variable. In the example, the increment used is `1`, but it doesn't have to be `1`. If it's necessary to increment by `2`, `3`, etc., just use that number instead of `1`.

```
// Declare a variable called i available only inside the for
for (u8 i = 0, i < 10, i = i + 1) {
    // Keeps on executing as long as i is less than 10

    // At the end, increment i by 1
}
```

The assignment operator += can also be used for incrementing a for loop:

```
for (u8 i = 0, i < 10, i += 1) {
    // Body of loop
}
```

## Loop control flow statements

Inside of loops, the `break` and `continue` keyword may be used to control the execution flow inside the loop.

When a `break` statement is reached, the loop is terminated immediately and code flow continues after the loop. When a `continue` statement is reached, the current iteration is terminated immediately and code flow continues at the start of the loop again, checking the condition again.

Return statements
In order to return a value from a function, the `return` keyword is used.

The return type of the function will automatically be determined by the value returned.

```
fn get_value() {
    return 1234;
};

std::print("{}", get_value()); // 1234
```

## Pattern views

When using the placement syntax inside of functions or function statements in the global scope (such as `if`, `for`, or `while` statements), a view of that data is created instead.

A view acts very similar to a placed pattern - you can access and pass that value around as if it was a placed variable. However, it will not generate an output pattern like a regular placement would.

```
fn read_u32(u32 address) {
    u32 value @ address;

    return value;
};

std::print("{}", read_u32(0x1234)); // Prints the value at address 0x1234 formatted as a u32
```

## User-defined Literals

User-defined Literals are ultimately syntactic sugar for function calls which in some cases is easier to read than regular function calls. To create one, simply define a function whose name starts with an underscore and takes a single character.

```
fn _literal(u32 value) {
    return value * 2;
};

u32 two_times = 123_literal; // two_times = 246
```

It's also possible to define user-defined literals that take in multiple parameters. In this case, the value the literal is applied to is passed in as the first parameter and the remaining ones are passed as the second and following parameters.

```
fn _literal(u32 value, u32 multiplier) {
    return value * multiplier;
};

u32 three_times = 123_literal(3); // three_times = 369
```

Any built-in type can be used as the first parameter. This allows user-defined literals to be used with integers, floats, character literals and strings.

=============

# Control flow

The pattern language offers multiple ways to modify the behaviour of the parser on the go based on the values already parsed, allowing you to parse complex formats with relative ease.

## Conditionals

In the pattern language, not all structs need to be the same size or have the same layout. It’s possible to change what variables are getting declared based on the value of other variables.

```
enum Type : u8 {
    A = 0x54,
    B = 0xA0,
    C = 0x0B
};

struct PacketA {
    float x;
};

struct PacketB {
    u8 y;
};

struct PacketC {
    char z[];
};

struct Packet {
    Type type;

    if (type == Type::A) {
        PacketA packet;
    }
    else if (type == Type::B) {
        PacketB packet;
    }
    else if (type == Type::C)
        PacketC packet;
};

Packet packet[3] @ 0xF0;
```

This code looks at the first byte of each Packet to determine its type so it can decode the body of the packet accordingly using the correct types defined in PacketA, PacketB and PacketC.

Conditionals like this can be used in Structs, Unions and Bitfields

## Match statements

Match statements are a more powerful alternative to conditionals. They allow you to more easily match against multiple values and have more forms of comparison logic available.

```
enum Type : u8 {
    A = 0x54,
    B = 0xA0,
    C = 0x0B
};

struct PacketA {
    float x;
};

struct PacketB {
    u8 y;
};

struct PacketC {
    char z[];
};

struct Packet {
    Type type;

    match (type) {
        (Type::A): PacketA packet;
        (Type::B): PacketB packet;
        (Type::C): PacketC packet;
    }
};

Packet packet[3] @ 0xF0;
```

But the match statement allows for much more than just a simple switch. It also allows you to match multiple values at once and use more complex comparison logic. Alongside this is the \_ wildcard that matches any value, and thus also creates the default case.

```
struct Packet {
  Type type;
  u8 size;

  match (type, size) {
    (Type::A, 0x200): PacketA packet;
    (Type::C, _): PacketC packet;
    (_, _): PacketB packet;
  }
};

Packet packet[3] @ 0xF0;
```

Also the match statement has special comparisons that allow for more batchful comparisons. The … operator allows you to match a range of values, and the | operator allows to match between multiple values.

```
struct Packet {
  Type type;
  u8 size;

  match (type, size) {
    (Type::A, 0x200): PacketA packet;
    (Type::C, 0x100 | 0x200): PacketC packet;
    (Type::B, 0x100 ... 0x300): PacketB packet;
  }
};

Packet packet[3] @ 0xF0;
```

## Pattern control flow

The most basic form of conditional parsing are array control flow statements, `break` and `continue`. These allow you to stop the parsing of the array or skip elements based on conditions in the currently parsed item instance.

### Break

When a break is reached, the current array creation process is terminated. This means, the array keeps all entries that have already been parsed, including the one that’s being currently processed, but won’t expand further, even if the requested number of entries hasn’t been reached yet.

```
struct Test {
  u32 x;

  if (x == 0x11223344)
    break;
};

// This array requests 1000 entries but stops growing as soon as it hits a u32 with the value 0x11223344
// causing it to have a size less than 1000
Test tests[1000] @ 0x00;
```

`break` can also be used in regular patterns to prematurely stop parsing of the current pattern.

If the pattern where break is being used in is nested inside of another pattern, only evaluation of the current pattern is stopped and continues in the parent struct after the definition of the current pattern.

### Continue

When a continue is reached, the currently evaluated array entry gets evaluated to find next array entry offset but then gets discarded. This can be used to conditionally exclude certain array entries from the list that are either invalid or shouldn’t be displayed in the pattern data list while still scanning the entire range the array would span.

This can for instance be used in combination with In/Out Variables (check the section with this name down to this text) to easily filter array items.

```
struct Test {
  u32 value;

  if (value == 0x11223344)
    continue;
};

// This array requests 1000 entries but skips all entries where x has the value 0x11223344
// causing it to have a size less than 1000
Test tests[1000] @ 0x00;
```

`continue` can also be used in regular patterns to discard the pattern entirely.

If the pattern where `continue` is being used in is nested inside of another pattern, only the current pattern is discarded and evaluation continues in the parent struct after the definition of the current pattern.

## Return statements

Return statements outside of functions can be used to prematurely terminate execution of the current program.

Evaluation stops at the location the `return` statement was executed. All patterns that have been evaluated up until this point will be finished up and placed into memory before execution halts.

## Try-Catch statements

Try-Catch blocks are used to try placing down patterns that might error and then handling that error.

The following code will try to place all the patterns in the `try` block and if any error occurred while doing so, it will discard the patterns it tried to place, revert the cursor back to where it was at the start of the `try` block and then execute the `catch` block instead.

```
struct Test {
    try {
        u32 x;
        SomeStructThatWillError someStruct;
    } catch {
        SomeAlternativeStruct someStruct;
    }
};
```

=============

# In / Out Variables

In and Out variables are a way to pass config or input data into the pattern and read result data back out from the pattern.

Each `in` and `out` variable creates an entry in the Settings tab of the Pattern Editor view. `in` variables create an input field, `out` variables create a label.

Before executing the pattern, the user can now enter a value in the input field of the `in` variable. This value will be copied into the corresponding `in` variable before the pattern is executed.

Likewise, once the pattern has finished executing, whatever value has been written to the `out` variable will be displayed in the label.

The following code shows a simple pattern that reads in the value of `inputValue`, multiplies it by two and then writes it back into `outputValue`.

```
u32 inputValue in;
u32 outputValue out;

fn main() {
    outputValue = inputValue * 2;
};
```

=============

# Attributes

Attributes are special directives that can add extra configuration to individual variables and types.

```
struct RGBA8 {
  u8 red   [[color("FF0000")]];
  u8 green [[color("00FF00")]];
  u8 blue  [[color("0000FF")]];
} [[static, color(std::format("{:02X}{:02X}{:02X}", red, green, blue))]];
```

Attributes can either have no arguments: `[[attribute_name]]`
Or one or more arguments: `[[attribute_name("arg1", 1234)]]`

It’s also possible to apply multiple attributes to the same variable or type: [[attribute1, attribute2(1234)]]

## Variable Attributes

Variable attributes may also be applied to types directly to cause all patterns created from them to have those attributes applied.

To access members of the variable the attribute is applied to, use the this keyword. Some attributes expect an optional pattern as argument. If this is not necessary, you can use the null keyword instead.

`[[color("RRGGBB")]]`
Changes the color the variable is being highlighted in the hex editor.

`[[name("new_name")]]`
Changes the display name of the variable in the pattern data view without affecting the rest of the program.

`[[comment("text")]]`
Adds a comment to the current variable that is displayed when hovering over it in the pattern data view.

`[[format("formatter_function_name")]]` / `[[format_read("formatter_function_name")]]`
Overrides the default display value formatter with a custom function. The function requires a single argument representing the value to be formatted (e.g u32 if this attribute was applied to a variable of type u32) and return a string which will be displayed in place of the default value.

It’s also possible to return a pattern or value from this function which will then be default formatted using the default pattern language rules.

`[[format_write("formatter_function_name")]]`
Allows to specify a custom write formatter function for a type. The function takes in a string of the input provided by the user and returns any pattern that will be turned into bytes and gets written to the address of that pattern.

`[[format_entries("formatter_function_name")]]` / `[[format_read_entries("formatter_function_name")]]`
Can be applied to arrays and works the same as the `[[format_read]]` attribute but overrides the default display value formatter of all array entries instead of just the array pattern itself.

`[[format_write_entries("formatter_function_name")]]`
Can be applied to arrays and works the same as the `[[format_write]]` attribute but overrides the default value write formatter of all array entries instead of just the array pattern itself.

`[[hidden]]`
Prevents a variable from being shown in the pattern data view but still be usable from the rest of the program.

`[[inline]]`
Can only be applied to Arrays and Struct-like types. Visually inlines all members of this variable into the parent scope. Useful to flatten the displayed tree structure and avoid unnecessary indentation while keeping the pattern structured.

`[[transform("transformer_function_name")]]`
Specifies a function that will be executed to preprocess the value read from that variable before it’s accessed through the dot syntax (some_struct.some_value). The function requires a single argument representing the original value that was read (e.g u32 if this attribute was applied to a variable of type u32) and return a value that will be returned instead.

`[[transform_entries("transformer_function_name")]]`
Can be applied to arrays and works the same as the `[[transform]]` attribute but overrides the transform function of all array entries instead of just the array pattern itself.

`[[pointer_base("pointer_base_function_name")]]`
Specifies a function that will be executed to preprocess the address of the pointer this attribute was applied to. The function requires a single argument representing the original pointer address that was read (e.g u32 if this attribute was applied to a pointer with size type u32) and return the offset the pointer should point to instead.

There’s a number of predefined pointer helper functions available in the standard library (std::ptr) to rebase pointers off of different places.

`[[no_unique_address]]`
A variable marked by this attribute will be placed in memory but not increment the current cursor position.

`[[single_color]]`
Forces all members of the struct, union or array to be highlighted using the same color instead of individual ones

## Type Attributes

`[[static]]`
The Pattern Language by default optimizes arrays of built-in types so they don’t use up as much memory and are evaluated quicker.

This same optimization can be applied to custom data types when they are marked with this attribute to tell the runtime the size and layout of this type will always be the same.

However if the layout of the type this is applied to is not static or you're using functions or function statements (such as local variables) in them, highlighing and decoding of the data will be wrong! The behaviour is undefined and can change with any release. Do not depend on it!

`[[bitfield_order(ordering, size)]]`
This attribute changes the ordering and alignment of the fields within the bitfield it is applied to.

`ordering` can either be `std::core::BitfieldOrder::LeastToMostSignificant` or `std::core::BitfieldOrder::MostToLeastSignificant`. By default, if no custom bitfield ordering is set, if the bitfield is little endian, it orders the fields from least to most significant bit. If it's big endian, it orders the fields from most to least significant bit.

Using most to least significant also requires you to specify the full size of the bitfield so the runtime knows where to start placing the fields.

`[[sealed]]`
This attribute can be applied to structs, unions and bitfields. It causes tools that display Patterns in some way to not display the implementation details (such as children of this type) anymore but instead treat it like a built-in type. This is mainly useful for making custom types that should decode and display the bytes in a custom format using the `[[format]]` attribute.

`[[highlight_hidden]]`
Works the same as the `[[hidden]]` attribute but only hides the highlighting of the variable and not the variable in the pattern data view.

`[[export]]`
This attribute allows exporting of pattern local variables. By default pattern local variables will not end up in the output and are only used to store temporary values within patterns. Adding this attribute to one will make it end up in the output the same as a regular variable.

Very useful if a value needs to be pre-processed before being output.

`[[fixed_size(size)]]`
Can be used to force a struct to be a specific size. When applied to a struct whose size is smaller than `size`, it is padded out to be that exact size. If the struct was larger than the size, an error will be thrown instead.

=============

# Preprocessor

The preprocessor works in a similar fashion to the one found in C/C++. All lines that start with a # symbol are treated as preprocessor directives and get evaluated before the syntax of the rest of the program gets analyzed.

## `#define`

`#define MY_CONSTANT 1337`

This directive causes a find-and-replace to be performed. In the example above, the label MY_CONSTANT will be replaced with 1337 throughout the entire program without doing any sort of lexical analysis. This means the directive will be replaced even within strings. Additionally, if multiple defines are used, later find-and-replaces can modify expressions that got altered by previous ones.

## `#include`

`#include <mylibrary.hexpat>`
This directive allows inclusion of other files into the current program. The content of the specified file gets copied directly into the current file. See importing modules for more info.

## `#ifdef, #ifndef, #endif`

```
#ifdef SOME_DEFINE
    u32 value @ 0x00;
#endif
```

These preprocessor instructions can check if a given define has been defined already. #ifdef includes all the content between it and its closing #endif instruction if the define given to it exists. #ifndef works the same as #ifdef but includes all its content if the given define does not exist.

## `#error`

`#error "Something went wrong!"`
Throws a error during the preprocessing phase if reached. This is mostly helpful in combination with #ifdef and #ifndef to check on certain conditions.

## `#pragma`

`#pragma endian big`
Pragmas are hints to the runtime to tell it how it should treat certain things.

The following pragmas are available:

### `endian`

**Possible values:** `big`, `little`, `native` **Default:** `native`

This pragma overwrites the default endianness of all variables declared in the file.

### `MIME`

**Possible values:** Any MIME Type string **Default:** `Unspecified`

This pragma specifies the MIME type of files that can be interpreted by this pattern. This is useful for automatically loading relevant patterns when a file is opened. The MIME type of the loaded file will be matched against the MIME type specified here and if it matches, a popup will appear asking if this pattern should get loaded.

### `magic`

**Possible values:** A byte pattern in the form of `[ AA BB ?? D? ] @ 0x00`

This pragma specifies a binary pattern that is used to check the loaded data in order to determine if this pattern can be used to parse this data.

The pattern consists of two parts. The first one is a list of hexadecimal values where ? denotes a wildcard. This list is checked in order against the data, nibbles that are marked as wildcards are ignored and not compared. The second part is the hexadecimal value after the @ symbol which is interpreted as an address where to look for that pattern in the data.

### `base_address`

**Possible values:** Any integer value **Default:** `0x00`

This pragma automatically adjusts the base address of the currently loaded file. This is useful for patterns that depend on a file being loaded at a certain address in memory.

### `eval_depth`

**Possible values:** Any integer value **Default:** `32`

This pragma sets the evaluation depth of recursive functions and types. To prevent the runtime from crashing when evaluating infinitely deep recursive types, execution will stop prematurely if it detects recursion that is too deep. This pragma can adjust the maximum depth allowed.

### `array_limit`

**Possible values:** Any integer value **Default:** `0x1000`

This pragma sets the maximum number of entries allowed in an array. To prevent the runtime using up a lot of memory when creating huge arrays, execution will stop prematurely if an array with too many entries is evaluated. This pragma can adjust the maximum number of entries allowed.

### `pattern_limit`

**Possible values:** Any integer value **Default:** `0x2000`

This pragma sets the maximum number of patterns allowed to be created. To prevent the runtime using up a lot of memory when creating a lot of patterns, execution will stop prematurely if too many patterns exist simultaneously. This is similar to the `array_limit` pragma but catches smaller, nested arrays as well.

### `once`

This pragma takes no value and simply marks the current file to only be includable once. This means if the file is being included multiple times, for example when it’s being included explicitly first and later on again inside of another included file, it will only be included the first time.

This is mainly useful to prevent functions, types and variables that are defined in that file, from being defined multiple times.

The `import` statement and `#include` directive each keep a separate list of files marked with `#pragma once`. That means that a set of headers using one system for importing should stick to it. See Importing Modules section for more info.

### `bitfield_order`

**Possible values:** `right_to_left`, `left_to_right` **Default:** `right_to_left`

This pragma overrides the default bitfield bit order. It works the same as the `[[left_to_right]]` and `[[right_to_left]]` attributes but is automatically applied to all created bitfields.

### `debug`

This pragma enables the debug mode in the evaluator. This causes the following things to happen:

- Any scope push and pop will be logged to the console
- Any memory access will be logged to the console
- Any creation and assignment of variables will be logged to the console
- Any function call and their parameters will be logged to the console
- If an error occurs, the patterns that were already placed in memory will not be deleted

=============

# Importing Modules

Patterns can be split into multiple files to better separate pattern code into logical sections. To import other files into the current file, pattern language provides two facilities: the `#include` directive and the `import` statement. Both will search for a given file inside the `includes` folder in pattern search paths. The default search paths are:

- The ImHex installation directory.
- The `AppData/Local/imhex` directory.
- Additional search paths. To add additional search paths go to `Extras > Settings > Folders` menu.

## `#include directive`

A preprocessor directive. The preprocessor replaces this directive with all the lexical tokens from the included file _including_ all the preprocessor defines. On inclusion, this system maintains its own list of files marked with `#pragma once`.

To use the `#include` directive, specify a path to the file to include followed by the file extension. The path can be enclosed in double quotes (`"path/filename.extension"`) or pointy braces (`<path/filename.extension>`). The extension is optional. The `#include` directive looks for a file with extensions `.pat` and `.hexpat` if none is specified. However, by convention, the extension is specified when including files. Both of the following are valid ways to use the `#include` directive:

```
#include "std/io.pat"
#include <std/string.pat>
```

## `import` statement

The `import` statement is processed during the parsing stage. Once the parser encounters this statement, a separate parser is created to parse the imported file as a separate compilation unit. It's then inserted into the abstract syntax tree (AST) of the current file. The preprocessor defines _don't propagate_ when using the `import` statement.

The `import` keyword is followed by the path to the file to include with the dot (`.`) as the folder separator. The file extension will be resolved automatically. The statement looks for a file with extensions `.pat` and `.hexpat`. As with any other language statement, the line must end with a semicolon (`;`).

`import sys.mem;`

## `import as` statement

Libraries generally tend to place all their content under a specific namespace to prevent name collisions between different libraries. This however makes the code pretty verbose often.

To work around this, it's possible to change the namespace the types and functions are being imported into using the `as` keyword.

```
import std.ctype;

char character @ 0x00;
if (std::ctype::isdigit(character)) {
    // ...
}


// --------------

import std.ctype as c;

char character @ 0x00;
if (c::isdigit(character)) {
    // ...
}
```

## Importing other Patterns

When working with file formats, it sometimes happens that other files or formats are nested inside of the current data. For example, in an Archive file there might be a header and file table followed by data in other formats such as if the Archive contains some executables and images side by side.

In cases like this, it's often useful to import other patterns into the current one so that the code for these other formats can still be used separately.

To accomplish this, an `import * from <Pattern File> as <Type Name>` statement may be used.

```
import * from pe as Executable;

Executable executable @ 0x1234;
```

This code creates a new struct type called `Executable` from the content of the `pe.hexpat` Pattern file. Whenever the `Executable` type is placed anywhere in the current pattern now, the code in the imported pattern is evaluated instead, as the content was copy-pasted into the current file with all offsets adjusted.

The following implementation details might be interesting to know:

- When placing the created type at address `0x1000` for example, the imported pattern will see the file as if it started at address `0x1000`. It cannot access any bytes before `0x1000` and it will think address `0x1000` in the file is address 0x00.

- If there's only a single global placement in the imported pattern file, the content that pattern will be inlined into the newly created struct to not create another unnecessary indirection. If there's multiple global placements, they will be put in the created struct individually.

## `auto namespace`

Since a single library file can contain more than one namespace and it's not always desirable to dump the content of all these namespaces into the same renamed namespace, it's possible to specify which namespace should be the one imported and renamed if needed.

To do this, mark the namespace as `auto`:

```
// std/ctype.pat

namespace auto std::ctype {

    // ...

}

namespace impl {

    // ...

}
```

```
// Import the std::type namespace from the ctype.pat library file
// and rename the std::ctype namespace to test
import std.ctype as test;
```

## Include guards

### `#pragma once` directive

To prevent duplicate declarations, files meant for importing to other files can use the `#pragma once` directive to prevent multiple inclusions. Important, both `#include` directive and import statements keep their own list of files marked with `#pragma once`. That means when a file is included in the current file, and then transitively imported by importing a different file, the current file would get duplicate declarations. In other words, a file should only ever be included by using one of the systems: the `#include` directive or the import statement to prevent duplicate declarations.

Manual include guards
When using `#include`, you can write include guards manually using `#ifndef` and `#define` directives:

```
#ifndef FOO_HEXPAT
#define FOO_HEXPAT

// Pattern code

#endif
```

### Importing standard library headers

The standard library headers all use the `import` statement internally, and as such should be imported using `import`.

```
import std.io;
import std.mem;
import type.float16;
```

_Note_ however, that this only pertains to standard library headers. Custom patterns can still import standard library headers while using `#include` for files that are part of the client project.

## Forward declarations.

The pattern language supports **forward declarations** (we already talked about it above in section of Data Types).

=============

# Comments

The Pattern Language, just like most other programming languages, supports comments. A comment is a piece of text that is ignored by the evaluator. Comments are useful for documenting your code, and for temporarily disabling code.

## Single line comments

Single line comments start with a double slash (`//`) and continue to the end of the line.

`// This is a single line comment`

## Multi line comments

Multi line comments start with `/*` and end with `*/`.

```
/* This is
    a multi
    line comment */
```

## Doc comments

Doc comments are used to provide extra documentation for the whole pattern, individual functions or types.

There are multiple ways to write doc comments:

```
/*!
    This is a global doc comment.
    It documents the whole pattern and can contain various attributes that can be used by tools to extract information about the pattern.
*/

/**
    This is a local doc comment.
    It documents the function or type that immediately follows it.
*/

/**
    This is a doc comment documenting a function that adds two numbers together
    @param x The first parameter.
    @param y The second parameter.
    @return The sum of the two parameters.
*/
fn add(u32 x, u32 y) {
    return x + y;
};

/// This is a single line local comment. It documents the function or type that immediately follows it.
```

=============

# Sections

Sections are a way to create additional buffers of data whose content can be generated dynamically.

The following code creates a new section named “My Section” and then creates a buffer of 0x100 bytes in that section. The buffer is then filled with data.

At the end, it shows it is possible to place additional patterns inside the section to decode the data in it.

```
#include <std/mem.pat>

std::mem::Section mySection = std::mem::create_section("My Section");

u8 sectionData[0x100] @ 0x00 in mySection;

sectionData[0] = 0xAA;
sectionData[1] = 0xBB;
sectionData[2] = 0xCC;
sectionData[3] = 0xDD;

sectionData[0xFF] = 0x00;

u32 value @ 0x00 in mySection;
```

This is mainly useful for analyzing data that needs to be generated at runtime such as compressed, encrypted or otherwise transformed data.
