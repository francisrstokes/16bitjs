# 16-bit Javascript VM

The project consists of:

- The definition of an [assembly language](https://en.wikipedia.org/wiki/Assembly_language) with 37 instructions
- An [assembler](https://en.wikipedia.org/wiki/Assembly_language#Assembler) to transform a `*.asm` file into a binary executable format
- A small [virtual machine](https://en.wikipedia.org/wiki/Virtual_machine) which simulates a basic computer architecture: A memory space, stack, and CPU with 4 general purpose registers and a fetch-decode-execute cycle
- A compiler for the [brainfuck](https://en.wikipedia.org/wiki/Brainfuck) language directly to the binary executable format

The virtual machine can run in two modes: run (default) and step. Run mode simply run` the entire program in sucession. Step mode runs the program in a debug environment, pausing before executing each instruction and displaying the entire state of the machine.

## Running the VM
### Running the assembler

`node src/assembler -i {infile.asm} -o {outfile.bin}`

### Running the brainfuck compiler

`node src/compilers/bf -i {infile.bf} -o {outfile.bin}`

### Running a program

`node src -p {program.bin}`

## Assembly language

The assembly language consists of 16 distinct instructions which support all the basic features you would expect: Arithmetic, Loading values to and from memory/registers, conditional/non conditional jumps, functions, system calls for reading and and writing stdio etc.

Comments start with a `;` character.
Labels can be defined by `:some_label_name` on their own line and then referenced in an instruction like so: `LDV16 A, :some_label_name`.

### Examples

A couple of examples illustrating the language can be found in the `asm/` folder.

### Instruction set

#### Real instructions

|Instruction            |Arguments        |16 bit representation |Description|
|-----------------------|-----------------|----------------------|-------------|
|`MVR`                  | `D, S, V`       | `VVVVVVVVSSDDIIII`   | Add a sign-extended byte to value at source register and move it to destination register|
|`MVV`                  | `D, V, O`       | `VVVVVVVVOODDIIII`   | Move or add an immediate value into destination register, depending on `O`. |
|`LDA`                  | `D, M`          | `MMMMMMMMMMDDIIII`   | Load a value from memory into destination register using direct address|
|`STA`                  | `D, M`          | `MMMMMMMMMMDDIIII`   | Store the value in destination register into memory using direct address|
|`LDR`                  | `D, S[, V]`     | `VVVVVVVVSSDDIIII`   | Load from memory into the destination register using the source register as a base address|
|`STR`                  | `D, S[, V]`     | `XXXXXXXXSSDDIIII`   | Store the value in source register into the memory using the destination register as a base address|
|`ATH`                  | `D, S, O, M, B` | `BBBMOOOOSSDDIIII`   | Perform an arithmetic operation on the source and destination registers. O specifies the operation (listed below) and M is the mode, where 0 = place result in destination register and 1 = place result in source register. If the instruction is right or left shift then B specifies the shifting value|
|`CAL`                  | `D`             | `XXXXXXXXXXDDIIII`   | Call a function in memory pointed at by the destination register|
|`JCP`                  | `D, S, A, O`    | `XXXOOOAASSDDIIII`   | Jump to memory address pointed at by the address register, depending on the comparison specified by the O operation of the destination register and the source register. Operation table specified below.|
|`PSH`                  | `S`             | `XXXXXXXXSSXXIIII`   | Push the value in source register onto the stack|
|`POP`                  | `D`             | `XXXXXXXXXXDDIIII`   | Pop the stack into the destination register|
|`JMP`                  | `M`             | `VVVVVVVVVVVVIIII`   | Add a signed 12-bit offset to the program counter.|
|`JMR`                  | `S`             | `XXXXXXXXSSXXIIII`   | Jump to the address pointed at by the source register|
|`NOA`                  | `O`             | `XXXXXXXXOOOOIIII`   | No Argument calls. This includes `SYS`, `HLT` and `RET`, which have pseudo instructions |


#### Pseudo Instructions

Pseudo instructions are prepocessed by the assembler and expanded into combinations of the real instructions.

|Instruction|Arguments|Expanded length  |Description|
|-----------|---------|-----------------|-----------|
|`MVI`      | `D, V`    |1                | Set a zero-extended immediate value to destination register|
|`LDV`      | `D, S, V` |1                | Alias for `MVI` to keep retro-compatibility in assembly source|
|`MUI`      | `D, V`    |1                | Set a 8-bit left shifted immediate value to destination register|
|`ADI`      | `D, S`    |1                | Add a sign-extended immediate value to destination register|
|`INC`      | `D`       |1                | Alias for `ADI 1`|
|`DEC`      | `D`       |1                | Alias for `ADI -1`|
|`AUI`      | `D, S`    |1                | Add a 8-bit left shifted immediate value to destination register|
|`MOV`      | `D, S`    |1                | Copy value at source register to destination register|
|`RET`      |           |1                | Return from function|
|`HLT`      |           |1                | Program halt|
|`SYS`      |           |1                | Perform a system call. This is described below in more detail.|
|`LDM`      | `D, S`    |1                | Alias for `STA` to keep retro-compatibility in assembly source|
|`LDP`      | `D, S`    |1                | Alias for `STR` without offset to keep retro-compatibility in assembly source|
|`ADD`      | `D, S`    |1                | Add destination to source and store the result in destination|
|`ADDS`     | `D, S`    |1                | Add destination to source and store the result in source|
|`SUB`      | `D, S`    |1                | Subtract destination from source and store the result in destination|
|`SUBS`     | `D, S`    |1                | Subtract destination from source and store the result in source|
|`MUL`      | `D, S`    |1                | Multiply destination with source and store the result in destination|
|`MULS`     | `D, S`    |1                | Multiply destination with source and store the result in source|
|`DIV`      | `D, S`    |1                | Divide destination by source and store the result in destination|
|`DIVS`     | `D, S`    |1                | Divide destination by source and store the result in source|
|`LSF`      | `D, A`    |1                | Binary shift left the destination register by amount A (max 7)|
|`LSR`      | `D, A`    |1                | Binary shift right the destination register by amount A (max 7)|
|`AND`      | `D, S`    |1                | Binary and the destination and source, and store the result in the destination|
|`OR`       | `D, S`    |1                | Binary or the destination and source, and store the result in the destination|
|`XOR`      | `D, S`    |1                | Binary exclusive-or the destination and source, and store the result in the destination|
|`NOT`      | `D`       |1                | Binary not (invert) the destination|
|`LDV16`    | `D, V`    |2                | Load a 16 bit value into destination|
|`SWP`      | `D, S`    |3                | Swap the values in the source and destination registers|
|`JEQ`      | `D, S, A` |1                | Jump to address A if value in destination register is equal to the source register.|
|`JNE`      | `D, S, A` |1                | Jump to address A if value in destination register is not equal to the source register.|
|`JLT`      | `D, S, A` |1                | Jump to address A if value in destination register is less than the source register.|
|`JGT`      | `D, S, A` |1                | Jump to address A if value in destination register is greater than the source register.|
|`JLE`      | `D, S, A` |1                | Jump to address A if value in destination register is less than or equal to the source register.|
|`JGE`      | `D, S, A` |1                | Jump to address A if value in destination register is greater than or equal to the source register.|
|`JZE`      | `D, S, A` |1                | Jump to address A if value in destination register is zero.|
|`JNZ`      | `D, S, A` |1                | Jump to address A if value in destination register is not zero.|


#### Arithmetic Operation table

|Operation    |Value  |
|-------------|-------|
|`Add`        |`0000` |
|`Subtract`   |`0001` |
|`Multiply`   |`0010` |
|`Divide`     |`0011` |
|`Increment`  |`0100` |
|`Decrement`  |`0101` |
|`Left shift` |`0110` |
|`Right shift`|`0111` |
|`And`        |`1000` |
|`Or`         |`1001` |
|`Xor`        |`1010` |
|`Not`        |`1011` |

#### Conditional Jump Operation table

|Operation                |Value  |
|-------------------------|-------|
|`Equal`                  |`000` |
|`Not equal`              |`001` |
|`Less than`              |`010` |
|`Greater than`           |`011` |
|`Less than or equal`     |`100` |
|`Greater than or equal`  |`101` |
|`Zero`                   |`110` |
|`Not zero`               |`111` |


#### System calls

A system call in the VM allows the program to ask resources outside of it's context, such as communication with stdin and stdout. System calls are passed off to the os module and can return their results directly into the CPUs registers.

|System call           |Call code |
|----------------------|----------|
|Write to stdout       |`0000`    |
|Read from stdin buffer|`0001`    |

##### I/O Modes
###### Output
|Mode|Description                                            |B|C|D|
|----|-------------------------------------------------------|-|-|-|
|0   | Output register in decimal                            |Destination|Mode||
|1   | Output register in binary                             |Destination|Mode||
|2   | Output register in hex                                |Destination|Mode||
|3   | Output register as a character                        |Destination|Mode||
|4   | Output string in memory address pointed to by register|Start address|Mode||

###### Input
|Mode|Description                                         |B          |C  |D  |
|----|----------------------------------------------------|-----------|---|---|
|0   | Read single character value of input into register |Destination| - | - |
|    |                                                    |           |   |   |

## Debugger

Running with the step option (`node src -p {program.bin} --step`), enables the step through debugger, giving a overview of memory, stack and registers as the program executes.

```
Memory:
0000    08c1 0009 0008 0009 1d01 030b 1c81 030b 1d41 030b 1941 030b 0281 030b 000a 16c1
0010    0009 0008 0009 1d01 030b 1c81 030b 1d41 030b 1941 030b 0281 030b 000a 0081 000b
0020    2781 0009 0008 0281 0291 0009 1141 030b 1c41 030b 1d41 030b 1841 030b 1b01 030b
0030    0801 030b 18c1 030b 1a01 030b 1941 030b 18c1 030b 1ac1 030b 0e81 030b 000a 10d7
0040    11a1 0089 0008 1351 0049 0008 0049 0010 000a 1357 00e1 0089 0008 0009 1981 030b
0050    1841 030b 1b01 030b 1cc1 030b 1941 030b 0281 030b 000a 02c1 0291 0009 1381 030b
0060    1bc1 030b 1d01 030b 0801 030b 1141 030b 1c41 030b 1d41 030b 1841 030b 1b01 030b
0070    0801 030b 18c1 030b 1a01 030b 1941 030b 18c1 030b 1ac1 030b 0e81 030b 000a 20d7
0080    21a1 0089 0008 2351 0049 0008 0049 0010 000a 2357 2421 0089 0008 04a1 0089 0008
0090    0009 1981 030b 1841 030b 1b01 030b 1cc1 030b 1941 030b 0281 030b 000a 000c 0000
00a0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00b0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00c0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00d0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00e0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00f0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0100
Page 1/255

Stack:
0000    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0010    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0020    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0030    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0040    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0050    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0060    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0070    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0080    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0090    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00a0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00b0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00c0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00d0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00e0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
00f0    0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000

Instruction: (LDV) 0000100011000001
Registers:
A: 0000 B: 0000 C: 0000 D: 0000 IP: 0000        SP: 0000

(s)tep (e)xit (n)ext / (p)revious memory page >>>
```
