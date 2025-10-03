# `hex`

The ImHex helper library
The `hex` library contains functions that are exposed by the ImHex Hex Editor.

## `provider`

Library to interact with the currently loaded provider.

### Functions

#### `hex::prv::get_information`

Queries information from the currently loaded provider. The kind of information that's available depends on the provider that's loaded

**Available information**

- File Provider
  - `file_path() -> str`
  - `file_name() -> str`
  - `file_extension() -> str`
  - `creation_time() -> time_t`
  - `access_time() -> time_t`
  - `modification_time() -> time_t`
  - `permissions() -> u16`
- Disk Provider
  - `file_path() -> str`
  - `sector_size() -> u128`
- GDB Provider
  - `ip() -> str`
  - `port() -> u16`
- Process Memory Provider
  - `region_address(regionName) -> u64`
  - `region_size(regionName) -> u64`
  - `process_id() -> u32`
  - `process_name() -> str`
- `category`: Information category
- `argument`: Extra argument to pass along

`fn get_information(str category, str argument);`

## `core`

Core intrinsic functions to interact with the ImHex Hex Editor

### Types

#### `hex::core::Selection`

A type representing a selection in the hex editor

```rust
struct Selection { ... };
```

### Functions

#### `hex::core::get_selection`

Returns the current selection in the hex editor

- `return`: The current selection

```rust
fn get_selection();
```

#### `hex::core::add_virtual_file`

Add a file to the Virtual Filesystem

- `path`: The name of the file
- `pattern`: The pattern associated with the file

```rust
fn add_virtual_file(str path, auto pattern);
```

## `dec`

Library to allow decoding of more complex values

### Functions

#### `hex::dec::demangle`

Demangles a mangled name into a human readable name

- `mangled_name`: The mangled name
- `return`: The demangled name

```rust
fn demangle(str mangled_name);
```

#### `hex::dec::zlib_decompress`

Decompresses the bytes of a pattern into a section using the zlib algorithm

- `pattern`: The pattern whose bytes should be decompressed
- `section`: The section to decompress the data into
- `window_size`: The window size passed to zlib
- `return`: A value representing either the number of bytes decompressed or an error code from zlib

```rust
fn zlib_decompress(auto pattern, std::mem::Section section, u64 window_size);
```

#### `hex::dec::bzip_decompress`

Decompresses the bytes of a pattern into a section using the bzip algorithm

- `pattern`: The pattern whose bytes should be decompressed
- `section`: The section to decompress the data into
- `return`: true if successful, false otherwise

```rust
fn bzip_decompress(auto pattern, std::mem::Section section);
```

#### `hex::dec::lzma_decompress`

Decompresses the bytes of a pattern into a section using the LZMA algorithm

- `pattern`: The pattern whose bytes should be decompressed
- `section`: The section to decompress the data into
- `return`: true if successful, false otherwise

```rust
fn lzma_decompress(auto pattern, std::mem::Section section);
```

#### `hex::dec::zstd_decompress`

Decompresses the bytes of a pattern into a section using the zstd algorithm

- `pattern`: The pattern whose bytes should be decompressed
- `section`: The section to decompress the data into
- `return`: true if successful, false otherwise

```rust
fn zstd_decompress(auto pattern, std::mem::Section section);
```

#### `hex::dec::lz4_decompress`

Decompresses the bytes of a pattern into a section using the lz4 algorithm

- `pattern`: The pattern whose bytes should be decompressed
- `section`: The section to decompress the data into
- `frame`: Whether the data is framed or not
- `return`: true if successful, false otherwise

```rust
fn lz4_decompress(auto pattern, std::mem::Section section, bool frame);
```

## `http`

Library to do HTTP requests

### Functions

#### `hex::http::get`

Performs a HTTP GET request to the given URL and returns the response body

- `url`: URL to perform the request to
- `return`: Response body

```rust
fn get(str url);
```

## `encstr`

Types to work with custom encoded strings using Thiny encoding definitions

## `instruction`

Types to work with machine code

## `json`

Types to decode JSON and JSON-like file formats into a pattern tree

## mangled

Types to automatically decode mangled names

## Types

### `hex::type::MangledName`

A mangled name string that gets demangled when displayed

```rust
struct MangledName { ... } [[sealed, format]];
```

=============

# `std`

The `std` library is the Pattern Language's very own standard library. It contains various different helper functions and types as well wrappers for built-in functions.&#x20;

{% hint style="danger" %}
**Never** use functions from the `builtin::` namespace directly! These functions are exposed by the runtime to provide native implementations of various functions.&#x20;

Instead, include the correct library file and use the functions defined in there. Failing to do so will result in your pattern randomly breaking between updates.
{% endhint %}

{% hint style="note" %}
The [`io`](./io.pat) and [`sys`](./sys.pat) modules define members in the bare `std::` namespace.
{% endhint %}

## `array`

The array library contains a helper type to make it easier to create multi-dimensional arrays
and pass arrays to functions as parameters.

### Multi-dimensional arrays

The following example shows how to use multi-dimensional arrays with structs.

```rust
import std.array;

struct File {
u8 width, height;
std::Array<std::Array<u8, parent.width>, height> cells;
};

File file @ 0x00;
```

### Types

#### `std::Array`

Simple one dimensional array wrapper

- `<T>`: The array types
- `<Size>`: Number of entries in the array

```rust
struct Array<T, auto Size> { ... } [[format]];
```

#### `std::ByteSizedArray`

Simple array wrapper for an array with a size in bytes

- `<T>`: The array types
- `<NumBytes>`: Number of bytes the array contains

```rust
struct ByteSizedArray<T, auto NumBytes> { ... } [[format]];
```

#### `std::IIndexed`

An interface type for getting the index of the currently processed element in an array. This is a nice wrapper around `std::core::array_index()`

To use it, inherit from it and use the `this.index` field to get the index of the current element

```rust
struct IIndexed { ... };
```

## attrs

The attributes library contains a set of attributes that can be used to annotate types with certain properties.
To use an attribute, simply make your custom type inherit from the attribute type you want to use.

For example, to make a type hidden, you can use the `Hidden` attribute like this:

```rust
struct MyType : std::attr::Hidden {
// ...
};
```

### Types

#### `std::attr::Commented`

Attribute that adds a comment to the variable created from a type.

- `<Comment>`: The comment to add

```rust
struct Commented<auto Comment> { ... } [[comment]];
```

#### `std::attr::Hidden`

Attribute that marks a type as hidden.
This means variables of this type are not displayed in the UI.

```rust
struct Hidden { ... } [[hidden]];
```

#### `std::attr::HighlightHidden`

Attribute that marks a type as hidden and also hides it from the highlighter.
This means variables of this type are don't display any highlighting in the UI but are still visible.

```rust
struct HighlightHidden { ... } [[highlight_hidden]];
```

#### `std::attr::Inlined`

Attribute that marks a type as inline.
Creating a variable of this type will not create a new layer but instead dump the contents of the type directly into the current layer.

```rust
struct Inlined { ... } [[inline]];
```

#### `std::attr::Literal`

Attribute that marks a type as a literal type.
This means the type behaves like a built-in type in the sense that it doesn't show its internal state and its display value is determined by a format function.
It can also be transformed into a different built-in literal when used in an expression.

- `<FormatFunction>`: The format function to use. The return value of this function is used to display the value of the literal and also determines the value returned when the literal is used in an expression.

```rust
struct Literal<auto FormatFunction> { ... } [[sealed, format_read, transform]];
```

#### `std::attr::Named`

Attribute that changes the name of the variable created from a type.

- `<Name>`: The name of the variable created

```rust
struct Named<auto Name> { ... } [[name]];
```

#### `std::attr::Sealed`

Attribute that marks a type as sealed.
Sealed types don't display their internal state in the UI.

```rust
struct Sealed { ... } [[sealed]];
```

## bit

This library contains various helper functions for common bit operations.

### Functions

#### `std::bit::popcount`

Calculates the number of 1 bits in a given number

- `x`: The number
- `return`: The number of bits set to 1 in `x`

```rust
fn popcount(u128 x);
```

#### `std::bit::has_single_bit`

Checks if only a single bit is set to 1 in a given number

- `x`: The number
- `return`: True if there's a single bit set to 1 in `x`, false otherwise

```rust
fn has_single_bit(u128 x);
```

#### `std::bit::bit_ceil`

Rounds the given number up to the next bigger power of two

- `x`: The number
- `return`: Next bigger power of two that can fit `x`

```rust
fn bit_ceil(u128 x);
```

#### `std::bit::bit_floor`

Rounds the given number down to the next bigger power of two

- `x`: The number
- `return`: Next smaller power of two

```rust
fn bit_floor(u128 x);
```

## core

The core library contains intrinsics and "compiler magic" functions that
get extra help from the runtime to fulfill their purpose.

### Types

#### `std::core::BitfieldOrder`

```rust
enum BitfieldOrder : u8 {
    LeastToMostSignificant,
    LeftToRight,
    MostToLeastSignificant,
    RightToLeft
};
```

### Functions

#### `std::core::has_attribute`

Checks if a pattern has a specific attribute assigned to it

- `pattern`: The pattern to check
- `attribute`: The attribute's name to check for

```rust
fn has_attribute(auto pattern, str attribute);
```

#### `std::core::get_attribute_argument`

Returns the nth parameter of the attribute of a pattern if it has one

- `pattern`: The pattern to check
- `attribute`: The attribute's name to query
- `[index]`: The parameter index of the attribute to return. Defaults to 0

```rust
fn get_attribute_argument(auto pattern, str attribute, u32 index);
```

#### `std::core::get_attribute_value`

```rust
fn get_attribute_value(auto pattern, str attribute);
```

#### `std::core::set_endian`

Sets the current default endianness.
Any patterns created following this attribute will be created using the set endianness.

- `endian`: The new default endianness

```rust
fn set_endian(std::mem::Endian endian);
```

#### `std::core::get_endian`

Gets the current default endianness.

- `return`: The currently set default endianness

```rust
fn get_endian();
```

#### `std::core::set_bitfield_order`

```rust
fn set_bitfield_order(std::core::BitfieldOrder order);
```

#### `std::core::get_bitfield_order`

```rust
fn get_bitfield_order();
```

#### `std::core::array_index`

When used inside of a pattern that's being created using a pattern,
returns the current array index that's being processed.
If used outside of an array, always yields 0.

- `return`: The current array index

```rust
fn array_index();
```

#### `std::core::member_count`

Queries the number of members of a struct, union or bitfield or the number of entries in an array

- `pattern`: The pattern to check
- `return`: The number of members in `pattern`

```rust
fn member_count(auto pattern);
```

#### `std::core::has_member`

Checks whether or not a given pattern has a member with a given name

- `pattern`: The pattern to check
- `name`: The name of the member to look for
- `return`: True if a member called `name` exists, false otherwise

```rust
fn has_member(auto pattern, str name);
```

#### `std::core::formatted_value`

Formats a pattern using it's default formatter or its custom formatter function set through
the `[[format]]` or `[[format_read]]` attribute

- `pattern`: The pattern to format
- `return`: Formatted string representation of `pattern`

```rust
fn formatted_value(auto pattern);
```

#### `std::core::is_valid_enum`

Checks if the given enum value corresponds has a corresponding constant

- `pattern`: The enum value to check
- `return`: True if pattern has a valid enum representation, false if not

```rust
fn is_valid_enum(auto pattern);
```

#### `std::core::set_pattern_color`

Changes the color of the given pattern to a new color

- `pattern`: The pattern to modify
- `color`: The RGBA8 color

```rust
fn set_pattern_color(auto pattern, u32 color);
```

#### `std::core::set_display_name`

Changes the display name of a given pattern

- `pattern`: The pattern to modify
- `name`: The new display name of the pattern

```rust
fn set_display_name(auto pattern, str name);
```

#### `std::core::set_pattern_comment`

Changes the comment attached to a pattern

- `pattern`: The pattern to modify
- `comment`: The new comment of the pattern

```rust
fn set_pattern_comment(auto pattern, str comment);
```

#### `std::core::execute_function`

Executes the function with the given name, passing in all given arguments

- `function_name`: The namespace-prefixed name of the function
- `args`: Arguments to pass to the function

```rust
fn execute_function(str function_name, auto ... args);
```

#### `std::core::set_pattern_palette_colors`

Sets the pattern color palette for all future created patterns

- `args`: RGBA8 colors as 32 bit integers (0xAABBGGRR)

```rust
fn set_pattern_palette_colors(auto ... colors, );
```

#### `std::core::reset_pattern_palette`

Resets the current pattern palette progress back to zero.
This can be useful to force all instances of a type to have the same coloring for its members

```rust
fn reset_pattern_palette();
```

## ctype

The ctype library has functions to check if a character is part of a specific category
of ASCII characters.

### Functions

#### `std::ctype::isdigit`

Checks if the given character `c` is a digit between '0' and '9'

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn isdigit(char c);
```

#### `std::ctype::isxdigit`

Checks if the given character `c` is a hexadecimal digit between '0' and '9', `A` and `F` or `a` and `f`

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn isxdigit(char c);
```

#### `std::ctype::isupper`

Checks if the given character `c` is a upper case letter between 'A' and 'Z'

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn isupper(char c);
```

#### `std::ctype::islower`

Checks if the given character `c` is a lower case letter between 'a' and 'z'

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn islower(char c);
```

#### `std::ctype::isalpha`

Checks if the given character `c` is either a upper or lower case letter between 'A' and 'Z' or 'a' and 'z'

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn isalpha(char c);
```

#### `std::ctype::isalnum`

Checks if the given character `c` is a upper or lower case letter or a number

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn isalnum(char c);
```

#### `std::ctype::isspace`

Checks if the given character `c` is a space character

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn isspace(char c);
```

#### `std::ctype::isblank`

Checks if the given character `c` is a invisible character

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn isblank(char c);
```

#### `std::ctype::isprint`

Checks if the given character `c` has a printable glyph

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn isprint(char c);
```

#### `std::ctype::iscntrl`

Checks if the given character `c` is a control code

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn iscntrl(char c);
```

#### `std::ctype::isgraph`

Checks if the given character `c` has a visible glyph

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn isgraph(char c);
```

#### `std::ctype::ispunct`

Checks if the given character `c` is a punctuation character

- `c`: The character to check
- `return`: True if `c` is part of this range, false otherwise

```rust
fn ispunct(char c);
```

## file

The File library allows reading and writing from/to external files using
a C-like File IO API.

**These functions are considered dangerous and require the user to manually permit them**

### Types

#### `std::file::Handle`

A handle representing a file that has been opened

```rust
using Handle = s32;
```

#### `std::file::Mode`

The mode to open a file in.
Read opens the file in read-only mode
Write opens the file in read and write mode
Create creates a new file if it doesn't exist and overwrites an existing file

```rust
enum Mode : u8 {
    Create,
    Read,
    Write
};
```

### Functions

#### `std::file::open`

Opens a file

- `path`: The path to the file to open
- `mode`: File open mode
- `return`: Handle to the newly opened file

```rust
fn open(str path, std::file::Mode mode);
```

#### `std::file::close`

Closes a file handle that has been opened previously

- `handle`: The handle to close

```rust
fn close(std::file::Handle handle);
```

#### `std::file::read`

Reads the content of a file into a string

- `handle`: The file handle to read from
- `size`: Number of bytes to read
- `return`: String containing the read data

```rust
fn read(std::file::Handle handle, u64 size);
```

#### `std::file::write`

Writes the content of a string into a file

- `handle`: The file handle to write to
- `data`: String or Pattern to write to the file

```rust
fn write(std::file::Handle handle, auto data);
```

#### `std::file::seek`

Sets the current cursor position in the given file handle

- `handle`: The file handle to set the cursor position in
- `offset`: The offset to move the cursor to

```rust
fn seek(std::file::Handle handle, u64 offset);
```

#### `std::file::size`

Queries the size of a file

- `handle`: The handle of the file to get the size of
- `return`: The file's size

```rust
fn size(std::file::Handle handle);
```

#### `std::file::resize`

Resizes a file

- `handle`: The handle of the file to resize

```rust
fn resize(std::file::Handle handle, u64 size);
```

#### `std::file::flush`

Flushes changes made to a file to disk

- `handle`: The handle of the file to flush

```rust
fn flush(std::file::Handle handle);
```

#### `std::file::remove`

Deletes a file from disk. This will also automatically close this file

- `handle`: The handle of the file to delete

```rust
fn remove(std::file::Handle handle);
```

#### `std::file::create_directories`

Create all directories for the provided path

- `path`: The path for which all directories should be created

```rust
fn create_directories(str path);
```

## fxpt

Library for doing arithmetic with fixed point numbers and converting them from/to floating point numbers.

### Types

#### `std::fxpt::fixed`

A fixed point value

```rust
using fixed = s128;
```

### Functions

#### `std::fxpt::to_float`

Converts a fixed point value into a floating point value

- `fxt`: The fixed point value to convert
- `precision`: The bits of precision the new value should have
- `return`: The floating point representation of fxt

```rust
fn to_float(std::fxpt::fixed fxt, u32 precision);
```

#### `std::fxpt::to_fixed`

Converts a floating point value into a fixed point value

- `flt`: The floating point value to convert
- `precision`: The bits of precision the new value should have
- `return`: The fixed point representation of flt

```rust
fn to_fixed(double flt, u32 precision);
```

#### `std::fxpt::change_precision`

Changes the number of bits used to represent the decimal part of the given fixed point number

- `value`: The fixed point value to convert
- `start_precision`: The current number of bits used
- `end_precision`: The new number of bits used
- `return`: `value` as a new fixed point number with `end_precision` bits of precision

```rust
fn change_precision(std::fxpt::fixed value, u32 start_precision, u32 end_precision);
```

#### `std::fxpt::add`

Adds two fixed point numbers with a given precision together

- `a`: First fixed point number
- `b`: Second fixed point number
- `precision`: The precision of `a` and `b`
- `return`: Result of the addition of `a` and `b`

```rust
fn add(std::fxpt::fixed a, std::fxpt::fixed b, u32 precision);
```

#### `std::fxpt::subtract`

Subtracts two fixed point numbers with a given precision together

- `a`: First fixed point number
- `b`: Second fixed point number
- `precision`: The precision of `a` and `b`
- `return`: Result of the subtraction of `a` and `b`

```rust
fn subtract(std::fxpt::fixed a, std::fxpt::fixed b, u32 precision);
```

#### `std::fxpt::multiply`

Multiplies two fixed point numbers with a given precision together

- `a`: First fixed point number
- `b`: Second fixed point number
- `precision`: The precision of `a` and `b`
- `return`: Result of the multiplication of `a` and `b`

```rust
fn multiply(std::fxpt::fixed a, std::fxpt::fixed b, u32 precision);
```

#### `std::fxpt::divide`

Divides two fixed point numbers with a given precision together

- `a`: First fixed point number
- `b`: Second fixed point number
- `precision`: The precision of `a` and `b`
- `return`: Result of the division of `a` and `b`

```rust
fn divide(std::fxpt::fixed a, std::fxpt::fixed b, u32 precision);
```

## hash

The hash library contains various data hash functions

### Functions

#### `std::hash::crc8`

Calculates the CRC8 hash of the bytes inside of a given pattern

- `pattern`: The pattern to calculate the CRC8 hash of
- `init`: The CRC8 init value
- `poly`: The CRC8 polynomial
- `xorout`: The CRC8 XOR-Out value
- `reflect_in`: Whether or not the input bytes should be reflected
- `reflect_out`: Whether or not the output should be reflected
- `return`: Calculated CRC8 hash

```rust
fn crc8(auto pattern, u8 init, u8 poly, u8 xorout, bool reflect_in, bool reflect_out);
```

#### `std::hash::crc16`

Calculates the CRC16 hash of the bytes inside of a given pattern

- `pattern`: The pattern to calculate the CRC16 hash of
- `init`: The CRC16 init value
- `poly`: The CRC16 polynomial
- `xorout`: The CRC16 XOR-Out value
- `reflect_in`: Whether or not the input bytes should be reflected
- `reflect_out`: Whether or not the output should be reflected
- `return`: Calculated CRC16 hash

```rust
fn crc16(auto pattern, u16 init, u16 poly, u16 xorout, bool reflect_in, bool reflect_out);
```

#### `std::hash::crc32`

Calculates the CRC32 hash of the bytes inside of a given pattern

- `pattern`: The pattern to calculate the CRC32 hash of
- `init`: The CRC32 init value
- `poly`: The CRC32 polynomial
- `xorout`: The CRC32 XOR-Out value
- `reflect_in`: Whether or not the input bytes should be reflected
- `reflect_out`: Whether or not the output should be reflected
- `return`: Calculated CRC32 hash

```rust
fn crc32(auto pattern, u32 init, u32 poly, u32 xorout, bool reflect_in, bool reflect_out);
```

#### `std::hash::crc64`

Calculates the CRC64 hash of the bytes inside of a given pattern

- `pattern`: The pattern to calculate the CRC64 hash of
- `init`: The CRC64 init value
- `poly`: The CRC64 polynomial
- `xorout`: The CRC64 XOR-Out value
- `reflect_in`: Whether or not the input bytes should be reflected
- `reflect_out`: Whether or not the output should be reflected
- `return`: Calculated CRC64 hash

```rust
fn crc64(auto pattern, u64 init, u64 poly, u64 xorout, bool reflect_in, bool reflect_out);
```

## io

The IO library allows formatting strings and outputting text to the console

### Functions

#### `std::print`

Formats the given arguments using the format string and prints the result to the console
This function uses the C++20 `std::format` or libfmt's `fmt::format` syntax.

- `fmt`: Format string or any other value that can be converted to a string
- `args`: Values to use in the formatting

```rust
fn print(auto fmt, auto ... args);
```

#### `std::format`

Formats the given arguments using the format string and returns the result as a string
This function uses the C++20 `std::format` or libfmt's `fmt::format` syntax.

- `fmt`: Format string or any other value that can be converted to a string
- `args`: Values to use in the formatting
- `return`: The formatted string

```rust
fn format(auto fmt, auto ... args);
```

#### `std::error`

Aborts evaluation of the code immediately and prints a error message to the console

- `message`: The message to print

```rust
fn error(str message);
```

#### `std::warning`

Prints a warning message to the console

- `message`: The message to print

```rust
fn warning(str message);
```

## limits

Library to calculate the minimum and maximum values that fit into a given data type

### Functions

#### `std::limits::u8_min`

Returns the minimum value that can be stored in a `u8`.

- `return`: Minimum value

```rust
fn u8_min();
```

#### `std::limits::u8_max`

Returns the maximum value that can be stored in a `u8`.

- `return`: Maximum value

```rust
fn u8_max();
```

#### `std::limits::s8_min`

Returns the minimum value that can be stored in a `s8`.

- `return`: Minimum value

```rust
fn s8_min();
```

#### `std::limits::s8_max`

Returns the maximum value that can be stored in a `s8`.

- `return`: Maximum value

```rust
fn s8_max();
```

#### `std::limits::u16_min`

Returns the minimum value that can be stored in a `u16`.

- `return`: Minimum value

```rust
fn u16_min();
```

#### `std::limits::u16_max`

Returns the maximum value that can be stored in a `u16`.

- `return`: Maximum value

```rust
fn u16_max();
```

#### `std::limits::s16_min`

Returns the minimum value that can be stored in a `s16`.

- `return`: Minimum value

```rust
fn s16_min();
```

#### `std::limits::s16_max`

Returns the maximum value that can be stored in a `s16`.

- `return`: Maximum value

```rust
fn s16_max();
```

#### `std::limits::u32_min`

Returns the minimum value that can be stored in a `u32`.

- `return`: Minimum value

```rust
fn u32_min();
```

#### `std::limits::u32_max`

Returns the maximum value that can be stored in a `u32`.

- `return`: Maximum value

```rust
fn u32_max();
```

#### `std::limits::s32_min`

Returns the minimum value that can be stored in a `s32`.

- `return`: Minimum value

```rust
fn s32_min();
```

#### `std::limits::s32_max`

Returns the maximum value that can be stored in a `s32`.

- `return`: Maximum value

```rust
fn s32_max();
```

#### `std::limits::u64_min`

Returns the minimum value that can be stored in a `u64`.

- `return`: Minimum value

```rust
fn u64_min();
```

#### `std::limits::u64_max`

Returns the maximum value that can be stored in a `u64`.

- `return`: Maximum value

```rust
fn u64_max();
```

#### `std::limits::s64_min`

Returns the minimum value that can be stored in a `s64`.

- `return`: Minimum value

```rust
fn s64_min();
```

#### `std::limits::s64_max`

Returns the maximum value that can be stored in a `s64`.

- `return`: Maximum value

```rust
fn s64_max();
```

#### `std::limits::u128_min`

Returns the minimum value that can be stored in a `u128`.

- `return`: Minimum value

```rust
fn u128_min();
```

#### `std::limits::u128_max`

Returns the maximum value that can be stored in a `u128`.

- `return`: Maximum value

```rust
fn u128_max();
```

#### `std::limits::s128_min`

Returns the minimum value that can be stored in a `s128`.

- `return`: Minimum value

```rust
fn s128_min();
```

#### `std::limits::s128_max`

Returns the maximum value that can be stored in a `s128`.

- `return`: Maximum value

```rust
fn s128_max();
```

## math

Library containing more advanced mathematical operations.

### Types

#### `std::math::AccumulateOperation`

Options to use with the `std::math::accumulate` function.

```rust
enum AccumulateOperation : u8 {
    Add,
    Max,
    Min,
    Modulo,
    Multiply
};
```

### Functions

#### `std::math::min`

Compares the values `a` and `b` with each other and returns the smaller of the two

- `a`: First value
- `b`: Second value
- `return`: `a` if `a` is smaller than `b`, otherwise `b`

```rust
fn min(auto a, auto b);
```

#### `std::math::max`

Compares the values `a` and `b` with each other and returns the bigger of the two

- `a`: First value
- `b`: Second value
- `return`: `a` if `a` is bigger than `b`, otherwise `b`

```rust
fn max(auto a, auto b);
```

#### `std::math::clamp`

Clamps the value of `x` between `min` and `max`.

- `x`: Value
- `min`: Minimum value
- `max`: Maximum value
- `return`: `min` if `x` is smaller than `min`, `max` if `x` is bigger than `max`, `x` otherwise

```rust
fn clamp(auto x, auto min, auto max);
```

#### `std::math::abs`

Returns the absolute value of `x`.

- `x`: Value
- `return`: `x` if `x` is positive, `-x` otherwise

```rust
fn abs(auto x);
```

#### `std::math::sign`

Returns the sign of `x`.

- `x`: Value
- `return`: `1` if `x` is positive, `-1` if `x` is negative, `0` if `x` is zero

```rust
fn sign(auto x);
```

#### `std::math::copy_sign`

Copies the sign of `y` to `x`.

- `x`: Value
- `y`: Value
- `return`: `x` if `y` is positive, `-x` if `y` is negative

```rust
fn copy_sign(auto x, auto y);
```

#### `std::math::factorial`

Calculates the factorial of `x`.

- `x`: Value
- `return`: Factorial of `x`

```rust
fn factorial(u128 x);
```

#### `std::math::comb`

Calculates the binomial coefficient of `n` and `k`.

- `n`: Value
- `k`: Value
- `return`: Binomial coefficient of `n` and `k`

```rust
fn comb(u128 n, u128 k);
```

#### `std::math::perm`

Calculates the permutation of `n` and `k`.

- `n`: Value
- `k`: Value
- `return`: Permutation of `n` and `k`

```rust
fn perm(u128 n, u128 k);
```

#### `std::math::floor`

Floors the value of `value`.

- `value`: Value
- `return`: `value` floored

```rust
fn floor(auto value);
```

#### `std::math::ceil`

Ceils the value of `value`.

- `value`: Value
- `return`: `value` ceiled

```rust
fn ceil(auto value);
```

#### `std::math::round`

Rounds the value of `value`.

- `value`: Value
- `return`: `value` rounded

```rust
fn round(auto value);
```

#### `std::math::trunc`

Truncates the value of `value`.

- `value`: Value
- `return`: `value` truncated

```rust
fn trunc(auto value);
```

#### `std::math::log10`

Calculates the logarithm of `value` with base 10.

- `value`: Value
- `return`: Logarithm of `value` with base 10

```rust
fn log10(auto value);
```

#### `std::math::log2`

Calculates the logarithm of `value` with base 2.

- `value`: Value
- `return`: Logarithm of `value` with base 2

```rust
fn log2(auto value);
```

#### `std::math::ln`

Calculates the natural logarithm of `value`.

- `value`: Value
- `return`: Logarithm of `value` with base `e`

```rust
fn ln(auto value);
```

#### `std::math::fmod`

Calculates the floating point modulus of `value`.

- `value`: Value
- `return`: Floating point modulus of `value`

```rust
fn fmod(auto value);
```

#### `std::math::pow`

Calculates the value of `base` raised to the power of `exp`.

- `base`: Base
- `exp`: Exponent
- `return`: `base` raised to the power of `exp`

```rust
fn pow(auto base, auto exp);
```

#### `std::math::exp`

Calculates the value of the natural number `e` raised to the power of `value`.

- `value`: Exponent
- `return`: `e` raised to the power of `value`

```rust
fn exp(auto value);
```

#### `std::math::sqrt`

Calculates the square root of `value`.

- `value`: Value
- `return`: Square root of `value`

```rust
fn sqrt(auto value);
```

#### `std::math::cbrt`

Calculates the cubic root of `value`.

- `value`: Value
- `return`: Cubic root of `value`

```rust
fn cbrt(auto value);
```

#### `std::math::sin`

Calculates the sine of `value`.

- `value`: Angle value in radians
- `return`: Sine of `value`

```rust
fn sin(auto value);
```

#### `std::math::cos`

Calculates the cosine of `value`.

- `value`: Angle value in radians
- `return`: Cosine of `value`

```rust
fn cos(auto value);
```

#### `std::math::tan`

Calculates the tangent of `value`.

- `value`: Angle value in radians
- `return`: Tangent of `value`

```rust
fn tan(auto value);
```

#### `std::math::asin`

Calculates the arc sine of `value`.

- `value`: Angle value in radians
- `return`: Arc sine of `value`

```rust
fn asin(auto value);
```

#### `std::math::acos`

Calculates the arc cosine of `value`.

- `value`: Value
- `return`: Arc cosine of `value` in radians

```rust
fn acos(auto value);
```

#### `std::math::atan`

Calculates the arc tangent of `value`.

- `value`: Value
- `return`: Arc tangent of `value` in radians between `-pi/2` and `pi/2`

```rust
fn atan(auto value);
```

#### `std::math::atan2`

Calculates the arc tangent of `value`.

- `y`: Value representing the proportion of the y-coordinate
- `x`: Value representing the proportion of the x-coordinate.
- `return`: Arc tangent of `value` in radians between `-pi` and `pi`

```rust
fn atan2(auto y, auto x);
```

#### `std::math::sinh`

Calculates the hyperbolic sine of `value`.

- `value`: Angle value in radians
- `return`: Hyperbolic sine of `value`

```rust
fn sinh(auto value);
```

#### `std::math::cosh`

Calculates the hyperbolic cosine of `value`.

- `value`: Angle value in radians
- `return`: Hyperbolic cosine of `value`

```rust
fn cosh(auto value);
```

#### `std::math::tanh`

Calculates the hyperbolic tangent of `value`.

- `value`: Angle value in radians
- `return`: Hyperbolic tangent of `value`

```rust
fn tanh(auto value);
```

#### `std::math::asinh`

Calculates the arc hyperbolic sine of `value`.

- `value`: Value
- `return`: Arc hyperbolic sine of `value`

```rust
fn asinh(auto value);
```

#### `std::math::acosh`

Calculates the arc hyperbolic cosine of `value`.

- `value`: Value
- `return`: Arc hyperbolic cosine of `value`

```rust
fn acosh(auto value);
```

#### `std::math::atanh`

Calculates the arc hyperbolic tangent of `value`.

- `value`: Value
- `return`: Arc hyperbolic tangent of `value`

```rust
fn atanh(auto value);
```

#### `std::math::accumulate`

Calculates the sum of all values in the specified memory range.

- `start`: Start address
- `end`: End address
- `valueSize`: Size of each value in bytes
- `[section]`: Section to use
- `[operation]`: Operation to use. Defaults to addition
- `[endian]`: Endianness to use. Defaults to native
- `return`: Sum of all values in the specified memory range

```rust
fn accumulate(u128 start, u128 end, u128 valueSize, std::mem::Section section, std::math::AccumulateOperation operation, std::mem::Endian endian);
```

## mem

Library for doing raw memory accesses and other low-level operations.

### Types

#### `std::mem::AlignTo`

Aligns the cursor to the given alignment

- `<alignment>`: The alignment to align to

```rust
struct AlignTo<auto Alignment> { ... } [[hidden, sealed]];
```

#### `std::mem::Bytes`

A type representing a sequence of bytes without any specific meaning

- `<Size>`: The size of the sequence

```rust
struct Bytes<auto Size> { ... } [[sealed, format]];
```

#### `std::mem::Endian`

The endianness of a value

```rust
enum Endian : u8 {
    Big,
    Little,
    Native
};
```

#### `std::mem::MagicSearch`

Searches for a sequence of bytes and places the given type at that address

- `<Magic>`: The magic sequence to search for
- `<T>`: The type to place at the address

```rust
struct MagicSearch<auto Magic, T> { ... };
```

#### `std::mem::Reinterpreter`

Reinterprets a value as a different one

- `<From>`: The type to reinterpret from
- `<To>`: The type to reinterpret to

```rust
union Reinterpreter<From, To> { ... };
```

#### `std::mem::Section`

A Handle for a custom Section

```rust
using Section = u128;
```

### Functions

#### `std::mem::eof`

Function that returns true if the cursor position is at the end of the memory
This is usually used in while-sized arrays in the form of `u8 array[while(!std::mem::eof())]`

- `return`: True if the cursor is at the end of the memory

```rust
fn eof();
```

#### `std::mem::reached`

Function that returns true if the cursor position is at or beyond the given address

- `address`: The address to compare against
- `return`: True if the cursor is at or beyond the given address

```rust
fn reached(u128 address);
```

#### `std::mem::align_to`

Aligns the given value to the given alignment

- `alignment`: The alignment to align to
- `value`: The value to align
- `return`: The aligned value

```rust
fn align_to(u128 alignment, u128 value);
```

#### `std::mem::base_address`

Gets the base address of the data

- `return`: The base address of the memory

```rust
fn base_address();
```

#### `std::mem::size`

Gets the size of the data

- `return`: The size of the memory

```rust
fn size();
```

#### `std::mem::find_sequence`

Finds a sequence of bytes in the data

- `occurrence_index`: The index of the occurrence to find
- `bytes`: The bytes to find
- `return`: The address of the sequence

```rust
fn find_sequence(u128 occurrence_index, auto ... bytes);
```

#### `std::mem::find_sequence_in_range`

Finds a sequence of bytes in a specific region of the data

- `occurrence_index`: The index of the occurrence to find
- `offsetFrom`: The offset from which to start searching
- `offsetTo`: The offset to which to search
- `bytes`: The bytes to find
- `return`: The address of the sequence

```rust
fn find_sequence_in_range(u128 occurrence_index, u128 offsetFrom, u128 offsetTo, auto ... bytes);
```

#### `std::mem::find_string`

Finds a string in the data

- `occurrence_index`: The index of the occurrence to find
- `string`: The string to find
- `return`: The address of the sequence

```rust
fn find_string(u128 occurrence_index, str string);
```

#### `std::mem::find_string_in_range`

Finds a string in a specific region of the data

- `occurrence_index`: The index of the occurrence to find
- `offsetFrom`: The offset from which to start searching
- `offsetTo`: The offset to which to search
- `string`: The string to find
- `return`: The address of the sequence

```rust
fn find_string_in_range(u128 occurrence_index, u128 offsetFrom, u128 offsetTo, str string);
```

#### `std::mem::read_unsigned`

Reads a unsigned value from the memory

- `address`: The address to read from
- `size`: The size of the value to read
- `[endian]`: The endianness of the value to read. Defaults to native
- `return`: The value read

```rust
fn read_unsigned(u128 address, u8 size, std::mem::Endian endian);
```

#### `std::mem::read_signed`

Reads a signed value from the memory

- `address`: The address to read from
- `size`: The size of the value to read
- `[endian]`: The endianness of the value to read. Defaults to native
- `return`: The value read

```rust
fn read_signed(u128 address, u8 size, std::mem::Endian endian);
```

#### `std::mem::read_string`

Reads a string value from the memory

- `address`: The address to read from
- `size`: The size of the value to read
- `return`: The value read

```rust
fn read_string(u128 address, u128 size);
```

#### `std::mem::read_bits`

Reads a number of bits from the specified bit offset within the specified byte

- `byteOffset`: The byte offset within the data
- `bitOffset`: The bit offset to start the read at within the current byte
- `bitSize`: The total number of bits to read
- `return`: A u128 containing the value read

```rust
fn read_bits(u128 byteOffset, u128 bitOffset, u64 bitSize);
```

#### `std::mem::create_section`

Creates a new custom section with the given name

- `name`: The name of the section
- `return`: The handle to the section

```rust
fn create_section(str name);
```

#### `std::mem::delete_section`

Deletes a custom section

- `section`: The handle to the section

```rust
fn delete_section(std::mem::Section section);
```

#### `std::mem::get_section_size`

Gets the size of a custom section

- `section`: The handle to the section
- `return`: The size of the section

```rust
fn get_section_size(std::mem::Section section);
```

#### `std::mem::set_section_size`

Changes the size of a custom section

- `section`: The handle to the section
- `size`: The new size of the section

```rust
fn set_section_size(std::mem::Section section, u128 size);
```

#### `std::mem::copy_section_to_section`

Copies a range of bytes from one section into another

- `from_section`: The section to copy from
- `from_address`: The address to copy from
- `to_section`: The section to copy to
- `to_address`: The address to copy to
- `size`: The size of the range to copy

```rust
fn copy_section_to_section(std::mem::Section from_section, u64 from_address, std::mem::Section to_section, u64 to_address, u64 size);
```

#### `std::mem::copy_value_to_section`

Copies a range of bytes from the main section into a custom section

- `value`: The pattern whose bytes should be copied
- `to_section`: The section to copy to
- `to_address`: The address to copy to

```rust
fn copy_value_to_section(auto value, std::mem::Section to_section, u64 to_address);
```

#### `std::mem::current_bit_offset`

Returns the current bit offset when inside of a bitfield.

- `return`: The current bit offset between 0 and 7

```rust
fn current_bit_offset();
```

## ptr

The Pointer library contains helper functions to deal with pointer types.
The `relative_to` functions are meant to be used with the `[[pointer_base]]` attribute

### Types

#### `std::ptr::NullablePtr`

A nullable pointer, generic over both the pointee type and pointer type.

By nullable, we mean that if the pointer's value is zero (`0x0`), then the
value will appear as padding rather than a pointer to something, but
if the pointer's value is non-zero, that non-zero value will be treated as
a pointer of type `PointerTy` which points to an element of type `PointeeTy`.

Example:
A struct field called `p_myInfo` which is a nullable 64-bit pointer to an
element of type `MyInfoTy` would be written as:

```rust
struct MyStruct {
std::ptr::NullablePtr<MyInfoTy, u64> p_myInfo;
}
```

```rust
struct NullablePtr<PointeeTy, PointerTy> { ... };
```

### Functions

#### `std::ptr::relative_to_pointer`

Use the offset of the current pointer as start address

- `offset`: The pointer's value
- `return`: The new pointer base

```rust
fn relative_to_pointer(u128 offset);
```

#### `std::ptr::relative_to_parent`

Use the offset of the pointer's parent as start address

- `offset`: The pointer's value
- `return`: The new pointer base

```rust
fn relative_to_parent(u128 offset);
```

#### `std::ptr::relative_to_end`

Use the end of the file as pointer base address and use its value as offset backwards from there

- `offset`: The pointer's value
- `return`: The new pointer base

```rust
fn relative_to_end(u128 offset);
```

## random

Library to generate random numbers. Supports various different distribution types.

### Types

#### `std::random::Distribution`

Represents the type of distribution to use to generate a random number

```rust
enum Distribution : u8 {
    Bernoulli,
    Binomial,
    Cauchy,
    ChiSquared,
    Exponential,
    ExtremeValue,
    FisherF,
    Gamma,
    Geometric,
    LogNormal,
    NegativeBinomial,
    Normal,
    Poisson,
    StudentT,
    Uniform,
    Weibull
};
```

### Functions

#### `std::random::set_seed`

Sets the seed of the random number generator

- `seed`: Seed to use

```rust
fn set_seed(u64 seed);
```

#### `std::random::generate_using`

Generates a random number using the given distribution with the given parameters.
The random number generator used internally is C++'s std::mt19937_64 Mersenne Twister implementation.

> **Distributions**
>
> - `Uniform(min, max) -> i128`
> - `Normal(mean, stddev) -> double`
> - `Exponential(lambda) -> double`
> - `Gamma(alpha, beta) -> double`
> - `Weibull(a, b) -> double`
> - `ExtremeValue(a, b) -> double`
> - `ChiSquared(n) -> double`
> - `Cauchy(a, b) -> double`
> - `FisherF(m, n) -> double`
> - `StudentT(n) -> double`
> - `LogNormal(m, s) -> double`
> - `Bernoulli(p) -> bool`
> - `Binomial(t, p) -> i128`
> - `NegativeBinomial(k, p) -> i128`
> - `Geometric(p) -> i128`
> - `Poisson(mean) -> i128`

- `distribution`: Distribution to use
- `[param1]`: This parameter depends on the type of distribution used. Defaults to 0
- `[param2]`: This parameter depends on the type of distribution used. Defaults to 0

```rust
fn generate_using(std::random::Distribution distribution, auto param1, auto param2);
```

#### `std::random::generate`

Generates a uniformly distributed random number between `min` and `max`

- `[min]`: Minimum number. Defaults to 0
- `[max]`: Maximum number. Defaults to `u64_max`

```rust
fn generate(u64 min, u64 max);
```

## string

Library to interact with strings.

### Types

#### `std::string::NullString`

A null-terminated ASCII string.

```rust
using NullString = std::string::NullStringBase;
```

#### `std::string::NullString16`

A null-terminated UTF-16 string.

```rust
using NullString16 = std::string::NullStringBase;
```

#### `std::string::NullStringBase`

Base type for null-terminated strings. Represents a string with its size determined by the first 0x00 byte found.

- `<DataType>`: The type of the characters.

```rust
struct NullStringBase<> { ... } [[sealed, format, transform]];
```

#### `std::string::SizedString`

A ASCII string with a prefixed size.

- `<SizeType>`: The type of the size field.

```rust
using SizedString<SizeType> = std::string::SizedStringBase;
```

#### `std::string::SizedString16`

A UTF-16 string with a prefixed size.

- `<SizeType>`: The type of the size field.

```rust
using SizedString16<SizeType> = std::string::SizedStringBase;
```

#### `std::string::SizedStringBase`

Base type for sized strings. Represents a string with its size preceding it.

- `<SizeType>`: The type of the size field.
- `<DataType>`: The type of the characters.

```rust
struct SizedStringBase<, > { ... } [[sealed, format, transform]];
```

### Functions

#### `std::string::length`

Gets the length of a string.

- `string`: The string to get the length of.
- `return`: The length of the string.

```rust
fn length(str string);
```

#### `std::string::at`

Gets the character at a given index.

- `string`: The string to get the character from.
- `index`: The index of the character to get.
- `return`: The character at the given index.

```rust
fn at(str string, u32 index);
```

#### `std::string::substr`

Gets a substring of a string.

- `string`: The string to get the substring from.
- `pos`: The position of the first character of the substring.
- `count`: The number of characters to get.
- `return`: The substring.

```rust
fn substr(str string, u32 pos, u32 count);
```

#### `std::string::parse_int`

Converts a string to an integer.

- `string`: The string to convert.
- `base`: The base of the number.
- `return`: The integer.

```rust
fn parse_int(str string, u8 base);
```

#### `std::string::parse_float`

Converts a string to a float.

- `string`: The string to convert.
- `return`: The float.

```rust
fn parse_float(str string);
```

#### `std::string::to_string`

Converts any type to a string.

- `x`: The value to convert.
- `return`: The string.

```rust
fn to_string(auto x);
```

#### `std::string::starts_with`

Checks if a string starts with a given substring.

- `string`: The string to check.
- `part`: The substring to check for.
- `return`: True if the string starts with the substring, false otherwise.

```rust
fn starts_with(str string, str part);
```

#### `std::string::ends_with`

Checks if a string ends with a given substring.

- `string`: The string to check.
- `part`: The substring to check for.
- `return`: True if the string ends with the substring, false otherwise.

```rust
fn ends_with(str string, str part);
```

#### `std::string::contains`

Checks if a string contains a given substring.

- `string`: The string to check.
- `part`: The substring to check for.
- `return`: True if the string contains the substring, false otherwise.

```rust
fn contains(str string, str part);
```

#### `std::string::reverse`

Reverses a string.

- `string`: The string to reverse.
- `return`: The reversed string.

```rust
fn reverse(str string);
```

#### `std::string::to_upper`

Converts a string to upper case.

- `string`: The string to convert.
- `return`: The converted string.

```rust
fn to_upper(str string);
```

#### `std::string::to_lower`

Converts a string to lower case.

- `string`: The string to convert.
- `return`: The converted string.

```rust
fn to_lower(str string);
```

#### `std::string::replace`

Replaces all occurrences of a substring with another substring.

- `string`: The string to replace in.
- `pattern`: The substring to replace.
- `replace`: The substring to replace with.
- `return`: The string with the replacements.

```rust
fn replace(str string, str pattern, str replace);
```

## sys

Basic helper functions

### Functions

#### `std::assert`

Asserts that a given value is true. If it's not, abort evaluation and print the given message to the console

- `condition`: The condition that is required to be true
- `message`: The message to print in case the assertion doesn't hold

```rust
fn assert(bool condition, str message);
```

#### `std::assert_warn`

Asserts that a given value is true. If it's not, print the given message to the console as a warning

- `condition`: The condition that is required to be true
- `message`: The message to print in case the assertion doesn't hold

```rust
fn assert_warn(bool condition, str message);
```

#### `std::env`

Queries the value of a set environment variable given it's name

- `name`: The name of the env variable
- `return`: The value of that variable

```rust
fn env(str name);
```

#### `std::sizeof_pack`

Returns the number of parameters in a parameter pack.

- `pack`: The pack to check
- `return`: Number of parameters in `pack`

```rust
fn sizeof_pack(auto ... pack, );
```

#### `std::unimplemented`

Throws an error notifying the developer that the current code path is not implemented currently.

```rust
fn unimplemented();
```

## time

Library to handle time and date related operations.

### Types

#### `std::time::DOSDate`

A type to represent a DOS date.

```rust
bitfield DOSDate { ... } [[sealed]];
```

#### `std::time::DOSTime`

A type to represent a DOS time.

```rust
bitfield DOSTime { ... } [[sealed]];
```

#### `std::time::EpochTime`

A type to represent a time in seconds since the epoch.

```rust
using EpochTime = u32;
```

#### `std::time::Time`

A structured representation of a time and date.

```rust
struct Time { ... } [[sealed]];
```

#### `std::time::TimeConverter`

A helper type to convert between Time and u128.

```rust
union TimeConverter { ... };
```

#### `std::time::TimeZone`

A type to represent a time zone.

```rust
enum TimeZone : u8 {
    Local,
    UTC
};
```

### Functions

#### `std::time::epoch`

Returns the current time in seconds since the epoch.

- `return`: The current time in seconds since the epoch.

```rust
fn epoch();
```

#### `std::time::to_local`

Converts a time in seconds since the epoch to a local time.

- `epoch_time`: The time in seconds since the epoch.
- `return`: The local time.

```rust
fn to_local(std::time::EpochTime epoch_time);
```

#### `std::time::to_utc`

Converts a time in seconds since the epoch to a UTC time.

- `epoch_time`: The time in seconds since the epoch.
- `return`: The UTC time.

```rust
fn to_utc(std::time::EpochTime epoch_time);
```

#### `std::time::now`

Queries the current time in the specified time zone.

- `[time_zone]`: The time zone to query. Defaults to local.
- `return`: The current time in the specified time zone.

```rust
fn now(std::time::TimeZone time_zone);
```

#### `std::time::to_dos_date`

Converts a value to a DOS date.

- `value`: The value to convert.
- `return`: The DOS date.

```rust
fn to_dos_date(u16 value);
```

#### `std::time::to_dos_time`

Converts a value to a DOS time.

- `value`: The value to convert.
- `return`: The DOS time.

```rust
fn to_dos_time(u16 value);
```

#### `std::time::filetime_to_unix`

Converts a FILETIME to unix time.

- `value`: The value to convert.
- `return`: Timestamp formatted as unix time.

```rust
fn filetime_to_unix(u64 value);
```

#### `std::time::format`

Formats a time according to the specified format string.

- `time`: The time to format.
- `[format_string]`: The format string to use. Defaults to "%c".
- `return`: The formatted time.

```rust
fn format(std::time::Time time, str format_string);
```

#### `std::time::format_dos_date`

Formats a DOS date according to the specified format string.

- `date`: The DOS date to format.
- `[format_string]`: The format string to use. Defaults to "{}/{}/{}".
- `return`: The formatted DOS date.

```rust
fn format_dos_date(std::time::DOSDate date, str format_string);
```

#### `std::time::format_dos_time`

Formats a DOS time according to the specified format string.

- `time`: The DOS time to format.
- `[format_string]`: The format string to use. Defaults to "{:02}:{:02}:{:02}".
- `return`: The formatted DOS time.

```rust
fn format_dos_time(std::time::DOSTime time, str format_string);
```

=============

# `type`

The `type` library contains a number of commonly used types that can be used like primitive built-in types.&#x20;

This library makes heavy use of the Pattern Language's `[[format_read]]`, `[[format_write]]` and `[[transform]]` attribute to make these types work and feel as native as possible.

## base

Types used to change the base of the displayed integer value.
Used like `type::Hex<u32> hexNumber;`, `type::Oct<u16> octalNumber;`

### Types

#### `type::Bin`

Integer type representing a Binary value. Displays its value in binary format.

- `<T>`: Integer type to use

```rust
using Bin<T> = T [[format]];
```

#### `type::Dec`

Integer type representing a Decimal value. Displays its value in decimal format.

- `<T>`: Integer type to use

```rust
using Dec<T> = T [[format]];
```

#### `type::Hex`

Integer type representing a Hexadecimal value. Displays its value in hexadecimal format.

- `<T>`: Integer type to use

```rust
using Hex<T> = T [[format]];
```

#### `type::Oct`

Integer type representing a Octal value. Displays its value in octal format.

- `<T>`: Integer type to use

```rust
using Oct<T> = T [[format]];
```

## base64

Type representing a Base64 encoded string

### Types

#### `type::Base64`

Type representing a Base64 encoded string

- `<T>`: String type

```rust
struct Base64<T> { ... } [[sealed, format]];
```

## base64

Type representing a Base64 encoded string

### Types

#### `type::Base64`

Type representing a Base64 encoded string

- `<T>`: String type

```rust
struct Base64<T> { ... } [[sealed, format]];
```

## byte

Types to display single bytes using various different representations

### Types

#### `type::Bits`

Type visualizing the value of each individual bit

```rust
bitfield Bits { ... } [[format, bitfield_order]];
```

#### `type::Byte`

Type representing a single Byte. Decodes the byte as it's hexadecimal value, individual bits and nibbles

```rust
union Byte { ... } [[format, single_color]];
```

#### `type::Nibbles`

Type visualizing the value of the two nibbles

```rust
bitfield Nibbles { ... } [[format]];
```

## color

Types representing RGB or RGBA colors. The decoded color will be displayed in their color field

### Types

#### `type::RGB`

Type representing a generic RGB color with a variable number of bits for each color

- `<R>`: Number of bits used for the red component
- `<G>`: Number of bits used for the green component
- `<B>`: Number of bits used for the blue component

```rust
using RGB<auto R, auto G, auto B> = type::RGBA;
```

#### `type::RGB4444`

Type representing a RGBA color with 4 bits for the red component, 4 bits for green, 4 bits for blue and 4 bits for alpha

```rust
using RGB4444 = type::RGBA;
```

#### `type::RGB565`

Type representing a RGB color with 5 bits for the red component, 6 bits for green and 5 bits for blue

```rust
using RGB565 = type::RGB;
```

#### `type::RGB8`

Type representing a RGB color with 8 bits for the red component, 8 bits for green and 8 bits for blue

```rust
using RGB8 = type::RGB;
```

#### `type::RGBA`

Type representing a generic RGBA color with a variable number of bits for each color

- `<R>`: Number of bits used for the red component
- `<G>`: Number of bits used for the green component
- `<B>`: Number of bits used for the blue component
- `<A>`: Number of bits used for the alpha component

```rust
bitfield RGBA<auto R, auto G, auto B, auto A> { ... } [[sealed, format, color]];
```

#### `type::RGBA5551`

Type representing a RGBA color with 5 bits for the red component, 5 bits for green, 5 bits for blue and 1 bits for alpha

```rust
using RGBA5551 = type::RGBA;
```

#### `type::RGBA8`

Type representing a RGBA color with 8 bits for the red component, 8 bits for green, 8 bits for blue and 8 bits for alpha

```rust
using RGBA8 = type::RGBA;
```

## float16

Type representing a 16 bit half precision floating point number

### Types

#### `type::float16`

Type representing a 16 bit half precision floating point number

```rust
using float16 = u16 [[format]];
```

## fmt

Type that allows specifying its format value using a format string.

### Usage

The following code reads a u32 from the data and formats it as an upper case hexadecimal value with
a minimum of 8 digits which is prefixed by 0x.

The format string is the same as passed to `std::format()` and follows the libfmt specification.

```rust
type::Formatted<u32, "0x{:08X}"> hex_formatted_integer @ 0x00;
```

### Types

#### `type::Formatted`

Arbitrarily formatted type

- `<T>`: Type to format
- `<FormatString>`: libfmt format string to format the value

```rust
struct Formatted<T, auto FormatString> { ... } [[sealed, format, transform]];
```

## guid

Types to deal with UUIDs (Universally Unique Identifiers) / GUIDs (Globally Unique Identifiers) as described in RFC 4122

### Types

#### `type::GUID`

Type representing a GUID value

```rust
struct GUID { ... } [[sealed, format]];
```

#### `type::UUID`

Alias name for GUID

```rust
using UUID = type::GUID;
```

## ip

Types used to decode IP addresses

### Types

#### `type::IPv4Address`

A 4 byte IPv4 Address as described in RFC 791

```rust
struct IPv4Address { ... } [[sealed, format]];
```

#### `type::IPv6Address`

A 16 byte IPv6 Address as described in RFC 8200

```rust
struct IPv6Address { ... } [[sealed, format]];
```

## leb128

Types used to decode Little Endian Base 128 numbers used to store large numbers as space efficiently as possible

### Types

#### `type::LEB128`

Legacy alias for uLEB128

```rust
using LEB128 = type::uLEB128;
```

#### `type::LEB128Base`

Base LEB128 type. Use `uLEB128` and `sLEB128` instead.

```rust
struct LEB128Base { ... } [[sealed]];
```

#### `type::sLEB128`

A signed variant of a LEB128 number

```rust
using sLEB128 = type::LEB128Base [[format, transform]];
```

#### `type::uLEB128`

A unsigned variant of a LEB128 number

```rust
using uLEB128 = type::LEB128Base [[format, transform]];
```

## mac

Types used to decode MAC Addresses

### Types

#### `type::MACAddress`

A MAC Address as used in the Internet Protocol

```rust
struct MACAddress { ... } [[sealed, format]];
```

## magic

Types used to parse and enforce specific magic numbers

### Types

#### `type::Magic`

A Magic number. Throws an error if the magic number does not match the expected value

- `<ExpectedValue>`: A string representing the expected value

```rust
struct Magic<auto ExpectedValue> { ... } [[sealed, format]];
```

### Functions

#### `type::escape_bytes`

Escapes all bytes in a string to only contain printable characters. All non-printable bytes will be transformed to sequences in the \xFF form

- `value`: Byte array to escape
- `return`: Escaped string

```rust
fn escape_bytes(auto value);
```

## path

Types dealing with various kinds of resource paths

### Types

#### `type::DOSPath`

A type representing a DOS path using a '\\' backslash as delimiter

```rust
using DOSPath = type::Path;
```

#### `type::Path`

A generic type representing a path with an arbitrary delimiter

- `<Delimiter>`: The delimiter sequence used to separate two path segments

```rust
struct Path<auto Delimiter> { ... } [[format]];
```

#### `type::PathSegment`

Type representing a single path segment. Use the `Path` type instead of using this on its own

- `<Delimiter>`: The delimiter sequence used to separate two path segments

```rust
struct PathSegment<auto Delimiter> { ... } [[sealed, format]];
```

#### `type::UnixPath`

A type representing a Unix path using a '/' forward slash as delimiter

```rust
using UnixPath = type::Path;
```

## size

Types used to pretty print size values

### Types

#### `type::Size`

A generic size type which displays its value in Bytes (or kiB, MiB, GiB, TiB, PiB, EiB if larger)

- `<T>`: Underlying type

```rust
using Size<> = u128 [[format]];
```

#### `type::Size128`

A 128 bit size type

```rust
using Size128 = type::Size;
```

#### `type::Size16`

A 16 bit size type

```rust
using Size16 = type::Size;
```

#### `type::Size32`

A 32 bit size type

```rust
using Size32 = type::Size;
```

#### `type::Size64`

A 64 bit size type

```rust
using Size64 = type::Size;
```

#### `type::Size8`

A 8 bit size type

```rust
using Size8 = type::Size;
```

## time

Types used to decode various different time formats

### Types

#### `type::DOSDate`

A DOS Date value

```rust
using DOSDate = u16 [[format]];
```

#### `type::DOSTime`

A DOS Time value

```rust
using DOSTime = u16 [[format]];
```

#### `type::FILETIME`

A 64bit FILETIME value

```rust
using FILETIME = u64 [[format]];
```

#### `type::time32_t`

A 32 bit Unix time value

```rust
using time32_t = u32 [[format]];
```

#### `type::time64_t`

A 64 bit Unix time value

```rust
using time64_t = u64 [[format]];
```

#### `type::time_t`

Alias name for `time32_t`

```rust
using time_t = type::time32_t;
```

## 010

Alias types to make it easier to move template definitions over from 010 Editor to ImHex

### Types

#### `BYTE`

```rust
using BYTE = s8;
```

#### `CHAR`

```rust
using CHAR = s8;
```

#### `DOUBLE`

```rust
using DOUBLE = double;
```

#### `DWORD`

```rust
using DWORD = u32;
```

#### `FLOAT`

```rust
using FLOAT = float;
```

#### `INT`

```rust
using INT = s32;
```

#### `INT16`

```rust
using INT16 = s16;
```

#### `INT32`

```rust
using INT32 = s32;
```

#### `INT64`

```rust
using INT64 = s64;
```

#### `LONG`

```rust
using LONG = s32;
```

#### `QUAD`

```rust
using QUAD = s64;
```

#### `QWORD`

```rust
using QWORD = u64;
```

#### `SHORT`

```rust
using SHORT = s16;
```

#### `UBYTE`

```rust
using UBYTE = u8;
```

#### `UCHAR`

```rust
using UCHAR = u8;
```

#### `UINT`

```rust
using UINT = u32;
```

#### `UINT16`

```rust
using UINT16 = u16;
```

#### `UINT32`

```rust
using UINT32 = u32;
```

#### `UINT64`

```rust
using UINT64 = u64;
```

#### `ULONG`

```rust
using ULONG = u32;
```

#### `UQUAD`

```rust
using UQUAD = u64;
```

#### `USHORT`

```rust
using USHORT = u16;
```

#### `WORD`

```rust
using WORD = u16;
```

#### `__int64`

```rust
using __int64 = s64;
```

#### `__uint64`

```rust
using __uint64 = u64;
```

#### `byte`

```rust
using byte = s8;
```

#### `int`

```rust
using int = s32;
```

#### `int16`

```rust
using int16 = s16;
```

#### `int32`

```rust
using int32 = s32;
```

#### `int64`

```rust
using int64 = s64;
```

#### `long`

```rust
using long = s32;
```

#### `quad`

```rust
using quad = s64;
```

#### `short`

```rust
using short = s16;
```

#### `ubyte`

```rust
using ubyte = u8;
```

#### `uchar`

```rust
using uchar = u8;
```

#### `uint`

```rust
using uint = u32;
```

#### `uint16`

```rust
using uint16 = u16;
```

#### `uint32`

```rust
using uint32 = u32;
```

#### `uint64`

```rust
using uint64 = u64;
```

#### `ulong`

```rust
using ulong = u32;
```

#### `uquad`

```rust
using uquad = u64;
```

#### `ushort`

```rust
using ushort = u16;
```

## c

Alias definitions for all C stdint and regular data types

### Types

#### `__int128_t`

```rust
using __int128_t = s128;
```

#### `__int64_t`

```rust
using __int64_t = s64;
```

#### `__uint128_t`

```rust
using __uint128_t = u128;
```

#### `__uint64_t`

```rust
using __uint64_t = u64;
```

#### `char16_t`

```rust
using char16_t = char16;
```

#### `char32_t`

```rust
using char32_t = u32;
```

#### `char8_t`

```rust
using char8_t = char;
```

#### `int`

```rust
using int = s32;
```

#### `int128_t`

```rust
using int128_t = s128;
```

#### `int16_t`

```rust
using int16_t = s16;
```

#### `int32_t`

```rust
using int32_t = s32;
```

#### `int64_t`

```rust
using int64_t = s64;
```

#### `int8_t`

```rust
using int8_t = s8;
```

#### `intptr_t`

```rust
using intptr_t = s64;
```

#### `long`

```rust
using long = s32;
```

#### `ptrdiff_t`

```rust
using ptrdiff_t = s64;
```

#### `short`

```rust
using short = s16;
```

#### `size_t`

```rust
using size_t = u64;
```

#### `ssize_t`

```rust
using ssize_t = s64;
```

#### `uint128_t`

```rust
using uint128_t = u128;
```

#### `uint16_t`

```rust
using uint16_t = u16;
```

#### `uint32_t`

```rust
using uint32_t = u32;
```

#### `uint64_t`

```rust
using uint64_t = u64;
```

#### `uint8_t`

```rust
using uint8_t = u8;
```

#### `uintptr_t`

```rust
using uintptr_t = u64;
```

#### `wchar_t`

```rust
using wchar_t = char16;
```

## linux

Various data types used in the Linux Kernel

### Types

#### `be16`

```rust
using be16 = be u16;
```

#### `be32`

```rust
using be32 = be u32;
```

#### `be64`

```rust
using be64 = be u64;
```

#### `le16`

```rust
using le16 = le u16;
```

#### `le32`

```rust
using le32 = le u32;
```

#### `le64`

```rust
using le64 = le u64;
```

## rust

Alias definitions for Rust's data types

### Types

#### `f32`

```rust
using f32 = float;
```

#### `f64`

```rust
using f64 = double;
```

#### `i128`

```rust
using i128 = s128;
```

#### `i16`

```rust
using i16 = s16;
```

#### `i32`

```rust
using i32 = s32;
```

#### `i64`

```rust
using i64 = s64;
```

#### `i8`

```rust
using i8 = s8;
```

#### `isize`

```rust
using isize = i64;
```

#### `usize`

```rust
using usize = u64;
```

## win32

Alias definitions for various type names used in Windows applications

### Types

#### `ATOM`

```rust
using ATOM = WORD;
```

#### `BOOL`

```rust
using BOOL = bool;
```

#### `BOOLEAN`

```rust
using BOOLEAN = bool;
```

#### `BYTE`

```rust
using BYTE = u8;
```

#### `CCHAR`

```rust
using CCHAR = char;
```

#### `CHAR`

```rust
using CHAR = char;
```

#### `DWORD`

```rust
using DWORD = u32;
```

#### `DWORD32`

```rust
using DWORD32 = u32;
```

#### `DWORD64`

```rust
using DWORD64 = u64;
```

#### `DWORDLONG`

```rust
using DWORDLONG = u64;
```

#### `FLOAT`

```rust
using FLOAT = float;
```

#### `HANDLE`

```rust
using HANDLE = PVOID;
```

#### `HINSTANCE`

```rust
using HINSTANCE = HANDLE;
```

#### `HRESULT`

```rust
using HRESULT = LONG;
```

#### `INT`

```rust
using INT = s32;
```

#### `INT16`

```rust
using INT16 = s16;
```

#### `INT32`

```rust
using INT32 = s32;
```

#### `INT64`

```rust
using INT64 = s64;
```

#### `INT8`

```rust
using INT8 = s8;
```

#### `LONG`

```rust
using LONG = s32;
```

#### `LONG32`

```rust
using LONG32 = s32;
```

#### `LONG64`

```rust
using LONG64 = s64;
```

#### `LONGLONG`

```rust
using LONGLONG = s64;
```

#### `PVOID`

```rust
using PVOID = SIZE_T;
```

#### `QWORD`

```rust
using QWORD = u64;
```

#### `SHORT`

```rust
using SHORT = s16;
```

#### `SIZE_T`

```rust
using SIZE_T = u64;
```

#### `SSIZE_T`

```rust
using SSIZE_T = s64;
```

#### `UCHAR`

```rust
using UCHAR = u8;
```

#### `UINT`

```rust
using UINT = u32;
```

#### `UINT16`

```rust
using UINT16 = u16;
```

#### `UINT32`

```rust
using UINT32 = u32;
```

#### `UINT64`

```rust
using UINT64 = u64;
```

#### `UINT8`

```rust
using UINT8 = u8;
```

#### `ULONG`

```rust
using ULONG = u32;
```

#### `ULONG32`

```rust
using ULONG32 = u32;
```

#### `ULONG64`

```rust
using ULONG64 = u64;
```

#### `ULONGLONG`

```rust
using ULONGLONG = u64;
```

#### `USHORT`

```rust
using USHORT = u16;
```

#### `WORD`

```rust
using WORD = u16;
```
