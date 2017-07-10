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

|Instruction|Arguments|16 bit representation |Description|
|-----------|---------|-------------------------|-------------|
|`MOV`| ​​​`D, S` | `XXXXXXXXSSDD0001` | Move value at source register to destination register|
|`​LDV`| `D, V` | `VVVVVVVVVVDD0010` | Load a value into destination register. |
|`LDR`| `D, M` | `MMMMMMMMMMDD0011` | Load a value from memory into destination register|
|`LDM`| `D, M` | `MMMMMMMMMMDD0101` | Load the value in destination register into memory|
|`ADD`| `D, S` | `XXXXXXXXSSDD1001` | Add x and y and store the value in x|
|`SUB`| `D, S` | `XXXXXXXXSSDD1101` | Subtract x from y and store the value in x|
|`DIV`| `D, S` | `XXXXXXXXSSDD1010` | Divide x by y and store the value in x|
|`MUL`| `D, S`​ | `XXXXXXXXSSDD0110` | Multiply x and y and store the value in x|
|`SFT`| `S, D, V` | `VVVVVVVVSSXD1110` | Binary shift the value in the source register by V. Direction is determined as (left D == 0, right D == 1)|
|`JLT`| `D, M` | `MMMMMMMMMMDD0111` | Jump to memory address if value in the A register is less than value in destination register|
|`CAL`| `M` | `MMMMMMMMMMXX0000` | Call a function in memory|
|`RET`| | `XXXXXXXXXXXX0100` | Return from function|
|`PSH`| `S` | `XXXXXXXXSSXX1000` | Push the value in source register onto the stack|
|`​POP`| `D` | `XXXXXXXXXXDD1100` | Pop the stack into the destination register|
|`OUT`| `S` | `XXXXXXXXSSXX1011` | Output the value in source register|
|`HLT`| | `XXXXXXXXXXXX1111` | Program halt|


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
