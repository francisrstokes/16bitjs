# 16-bit Javascript VM

The project consists of:

- The definition of an [assembly language](https://en.wikipedia.org/wiki/Assembly_language) with 32 instructions
- An [assembler](https://en.wikipedia.org/wiki/Assembly_language#Assembler) to transform a `*.asm` file into a binary executable format
- A small [virtual machine](https://en.wikipedia.org/wiki/Virtual_machine) which simulates a basic computer architecture: A memory space, stack, and CPU with 4 general purpose registers and a fetch-decode-execute cycle

The virtual machine can run in two modes: run (default) and step. Run mode simply runs the entire program in sucession. Step mode runs the program in a debug environment, pausing before executing each instruction and displaying the entire state of the machine.

## Running the VM
### Running the assembler

`node src/assembler -i {infile.asm} -o {outfile.bin}`

### Running a program

`node src -p {program.bin}`

## Assembly language

The assembly language consists of 16 distinct instructions which support all the basic features you would expect: Arithmetic, Loading values to and from memory/registers, Conditional jumps, Functions, and Output to stdout.

Comments are supported only on their own line, and begin with a `#`.
Labels can be defined by `:some_label_name` on their own line and then referenced in an instruction like so: `JMP :some_label_name`.

### Examples

A couple of examples illustrating the language can be found in the `asm/` folder.

### Instruction set

#### Real instructions

|Instruction|Arguments|16 bit representation |Description|
|-----------|---------|-------------------------|-------------|
|`MOV`| ​​​`D, S` | `XXXXXXXXSSDD0000` | Move value at source register to destination register|
|`​LDV`| `D, V` | `VVVVVVVVVVDD0001` | Load a value into destination register. |
|`LDR`| `D, M` | `MMMMMMMMMMDD0010` | Load a value from memory into destination register|
|`LDM`| `D, M` | `MMMMMMMMMMDD0011` | Load the value in destination register into memory|
|`ATH`| `D, S, O, M, B` | `BBBMOOOOSSDD0100` | Perform an arithmetic operation on the source and destination registers. O specifies the operation (listed below) and M is the mode, where 0 = place result in destination register and 1 = place result in source register. If the instruction is right or left shift then B specifies the shifting value|
|`CAL`| `M` | `MMMMMMMMMMXX0101` | Call a function in memory|
|`RET`| | `XXXXXXXXXXXX0110` | Return from function|
|`JLT`| `D, M` | `MMMMMMMMMMDD0111` | Jump to memory address if value in the A register is less than value in destination register|
|`PSH`| `S` | `XXXXXXXXSSXX1000` | Push the value in source register onto the stack|
|`​POP`| `D` | `XXXXXXXXXXDD1001` | Pop the stack into the destination register|
|`OUT`| `M, S` | `MMMMMMMMSSXX1010` | Output the value in source register, using mode M (see below for modes)|
|`HLT`| | `XXXXXXXXXXXX1011` | Program halt|


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
|`LSF`      | `D, A`    |1                | Binary shift left the destination register by amount A (max 7)|
|`LSR`      | `D, A`    |1                | Binary shift right the destination register by amount A (max 7)|
|`AND`      | `D, S`    |1                | Binary and the destination and source, and store the result in the destination|
|`OR`       | `D, S`    |1                | Binary or the destination and source, and store the result in the destination|
|`XOR`      | `D, S`    |1                | Binary exclusive-or the destination and source, and store the result in the destination|
|`NOT`      | `D`       |1                | Binary not (invert) the destination|
|`DIVS`     | `D, S`    |1                | Divide destination by source and store the result in source|
|`LDV16`      | `D, V`    |6                | Load a 16 bit value into destination|
|`SWP`      | `D, S`    |3                | Swap the values in the source and destination registers|
|`PRT`      | `V`       |2 + (2 per character) | Print the string V. Should be enclosed in quotes|
|`JGE`      | `D, A`    |4                | Jump to address A if value in destination regigster is greater than or equal to the A register. Can potentially mutate all registers except A and destination|
|`JEQ`      | `D, A`    |11               | Jump to address A if value in destination regigster is equal to the A register. Can potentially mutate all registers except A and destination|
|`JNE`      | `D, A`    |14               | Jump to address A if value in destination regigster is equal to the A register. Can potentially mutate all registers except A and destination|



#### Output Modes

|Mode|Description|
|----|-----------|
|0   | Output register in decimal|
|1   | Output register in binary|
|2   | Output register in hex|
|3   | Output register as a character|

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

## Debugger

Running with the step option (`node src -p {program.bin} --step`), enables the step through debugger, giving a overview of memory, stack and registers as the program executes.

```
Instruction: (PSH) 0000000000001000
Registers:
A: 0000 B: 0000 C: 0000 D: 0000 IP: 0000 SP: 0000

Memory:
180e 0048 0088 00c8 0008 0122 0031 0112 001d 0041 001c 0008 0046 0011 000c
0048 0112 0069 07b7 000c 003c 002c 001c 0004 0502 0100 000b 000f 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000


Stack:
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000


(s)tep (e)xit >>>
```
