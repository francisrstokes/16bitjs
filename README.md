# 16-bit Javascript VM

The project consists of:

- The definition of an [assembly language](https://en.wikipedia.org/wiki/Assembly_language) with 16 distinct opcodes
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
|`MOV`| ​​​`D, S` | `XXXXXXXXSSDD0001` | Move value at source register to destination register|
|`​LDV`| `D, V` | `VVVVVVVVVVDD0010` | Load a value into destination register. |
|`LDR`| `D, M` | `MMMMMMMMMMDD0011` | Load a value from memory into destination register|
|`LDM`| `D, M` | `MMMMMMMMMMDD0101` | Load the value in destination register into memory|
|`ADD`| `D, S` | `XXXXXXXXSSDD1001` | Add source and destination registers and store the value in destination|
|`SUB`| `D, S` | `XXXXXXXXSSDD1101` | Subtract destination from source and store the value in destination|
|`DIV`| `D, S` | `XXXXXXXXSSDD1010` | Divide destination by source and store the value in destination|
|`MUL`| `D, S`​ | `XXXXXXXXSSDD0110` | Multiply source and destination and store the value in destination|
|`SFT`| `S, D, V` | `VVVVVVVVSSXD1110` | Binary shift the value in the source register by V. Direction is determined as (left D == 0, right D == 1)|
|`JLT`| `D, M` | `MMMMMMMMMMDD0111` | Jump to memory address if value in the A register is less than value in destination register|
|`CAL`| `M` | `MMMMMMMMMMXX0000` | Call a function in memory|
|`RET`| | `XXXXXXXXXXXX0100` | Return from function|
|`PSH`| `S` | `XXXXXXXXSSXX1000` | Push the value in source register onto the stack|
|`​POP`| `D` | `XXXXXXXXXXDD1100` | Pop the stack into the destination register|
|`OUT`| `M, S` | `MMMMMMMMSSXX1011` | Output the value in source register, using mode M (see below for modes)|
|`HLT`| | `XXXXXXXXXXXX1111` | Program halt|

#### Pseudo Instructions

These kind of instructions are prepocessed by the assembler and expanded into combinations of the real instructions.

|Instruction|Arguments|Expanded length  |Description|
|-----------|---------|-----------------|-----------|
|`SUBS`      | `D, S`    |4                | Subract destination from source and store the result in source|
|`DIVS`      | `D, S`    |4                | Divide destination by source and store the result in source|
|`LDV16`      | `D, V`    |6                | Load a 16 bit value into destination|
|`SWP`      | `D, S`    |3                | Swap the values in the source and destination registers|
|`PRT`      | `V`     |2 + (2 per character) | Print the string V. Should be enclosed in quotes|
|`JGE`      | `D, A`     |4 | Jump to address A if value in destination regigster is greater than or equal to the A register. Overwrites value in destination register|



#### Output Modes

|Mode|Description|
|----|-----------|
|0   | Output register in decimal|
|1   | Output register in binary|
|2   | Output register in hex|
|3   | Output register as a character|

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
