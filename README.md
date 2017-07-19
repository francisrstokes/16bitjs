# 16-bit Javascript VM

The project consists of:

- The definition of an [assembly language](https://en.wikipedia.org/wiki/Assembly_language) with 37 instructions
- An [assembler](https://en.wikipedia.org/wiki/Assembly_language#Assembler) to transform a `*.asm` file into a binary executable format
- A small [virtual machine](https://en.wikipedia.org/wiki/Virtual_machine) which simulates a basic computer architecture: A memory space, stack, and CPU with 4 general purpose registers and a fetch-decode-execute cycle

The virtual machine can run in two modes: run (default) and step. Run mode simply runs the entire program in sucession. Step mode runs the program in a debug environment, pausing before executing each instruction and displaying the entire state of the machine.

## Running the VM
### Running the assembler

`node src/assembler -i {infile.asm} -o {outfile.bin}`

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

|Instruction|Arguments|16 bit representation |Description|
|-----------|---------|-------------------------|-------------|
|`MOV`| `D, S`          | `XXXXXXXXSSDD0000` | Move value at source register to destination register|
|`LDV`| `D, V`          | `VVVVVVVVVVDD0001` | Load a value into destination register. |
|`LDR`| `D, M`          | `MMMMMMMMMMDD0010` | Load a value from memory into destination register|
|`LDM`| `D, M`          | `MMMMMMMMMMDD0011` | Load the value in destination register into memory|
|`LDA`| `D, S`          | `XXXXXXXXSSDD1110` | Load the value from memory pointed at by the source register into the destination register|
|`LDP`| `D, S`          | `XXXXXXXXSSDD1111` | Load the value in source register into the memory address pointed to by destination register|
|`ATH`| `D, S, O, M, B` | `BBBMOOOOSSDD0100` | Perform an arithmetic operation on the source and destination registers. O specifies the operation (listed below) and M is the mode, where 0 = place result in destination register and 1 = place result in source register. If the instruction is right or left shift then B specifies the shifting value|
|`CAL`| `D`             | `XXXXXXXXXXDD0101` | Call a function in memory pointed at by the destination register|
|`RET`|                 | `XXXXXXXXXXXX0110` | Return from function|
|`JLT`| `D, S`          | `XXXXXXXXSSDD0111` | Jump to memory address pointed at by the source register, if value in the A register is less than value in destination register|
|`PSH`| `S`             | `XXXXXXXXSSXX1000` | Push the value in source register onto the stack|
|`POP`| `D`             | `XXXXXXXXXXDD1001` | Pop the stack into the destination register|
|`SYS`|                 | `XXXXXXXXXXXX1010` | Perform a system call. This is described below in more detail.|
|`HLT`|                 | `XXXXXXXXXXXX1011` | Program halt|
|`JMP`| `M`             | `MMMMMMMMMMXX1100` | Jump to address in memory. Can only reference memory up to 0x3FF.|
|`JMR`| `S`             | `XXXXXXXXSSXX1101` | Jump to the address pointed at by the source register|


#### Pseudo Instructions

Pseudo instructions are prepocessed by the assembler and expanded into combinations of the real instructions.

|Instruction|Arguments|Expanded length  |Description|
|-----------|---------|-----------------|-----------|
|`ADD`      | `D, S`    |1                | Add destination to source and store the result in destination|
|`ADDS`     | `D, S`    |1                | Add destination to source and store the result in source|
|`SUB`      | `D, S`    |1                | Subract destination from source and store the result in destination|
|`SUBS`     | `D, S`    |1                | Subract destination from source and store the result in source|
|`MUL`      | `D, S`    |1                | Multiply destination with source and store the result in destination|
|`MULS`     | `D, S`    |1                | Multiply destination with source and store the result in source|
|`DIV`      | `D, S`    |1                | Divide destination by source and store the result in destination|
|`DIVS`      | `D, S`    |1                | Divide destination by source and store the result in source|
|`INC`      | `D`       |1                | Add one to the destination register|
|`DEC`      | `D`       |1                | Subtract one from the destination register|
|`LSF`      | `D, A`    |1                | Binary shift left the destination register by amount A (max 7)|
|`LSR`      | `D, A`    |1                | Binary shift right the destination register by amount A (max 7)|
|`AND`      | `D, S`    |1                | Binary and the destination and source, and store the result in the destination|
|`OR`       | `D, S`    |1                | Binary or the destination and source, and store the result in the destination|
|`XOR`      | `D, S`    |1                | Binary exclusive-or the destination and source, and store the result in the destination|
|`NOT`      | `D`       |1                | Binary not (invert) the destination|
|`LDV16`    | `D, V`    |6                | Load a 16 bit value into destination|
|`SWP`      | `D, S`    |3                | Swap the values in the source and destination registers|
|`PRT`      | `V`       |2 + (2 per character) | Print the string V. Should be enclosed in quotes|
|`JGE`      | `D, A`    |4                | Jump to address A if value in destination regigster is greater than or equal to the A register. Can potentially mutate all registers except A and destination|
|`JEQ`      | `D, A`    |11               | Jump to address A if value in destination regigster is equal to the A register. Can potentially mutate all registers except A and destination|
|`JNE`      | `D, A`    |14               | Jump to address A if value in destination regigster is equal to the A register. Can potentially mutate all registers except A and destination|


#### Arithmetic Operation table

|Operation    |Value  |
|-------------|-------|
|`Add`        |`0000` |
|`Subtract`   |`0001` |
|`Multiply`   |`0010` |
|`Divide`     |`0011` |
|`Left shift` |`0100` |
|`Right shift`|`0101` |
|`And`        |`0111` |
|`Or`         |`1000` |
|`Xor`        |`1001` |
|`Not`        |`1010` |


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
|4   | Output string in memory address pointed to by register|Start address|||

####### Input
|Mode|Description|B|C|D|
|----|-----------|-|-|-|
|0   | Read single character value of input into register |Destination|||

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
Page 1/4

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
