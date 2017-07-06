# 16-bit Javascript VM

## Using the assembler

`node src/assembler -i {infile.asm} -o {outfile.bin}`

## Running a program

`node src -p {program.bin}`

## Instruction table

|Instruction|Arguments|16 bit representation    |Description|
|-----------|---------|-------------------------|-------------|
|MOV        | d, s    | `00 00 00 00 ss dd 00 01` |Move value at source register to destination register|
|LDV        | d, v    | `vv vv vv vv 00 dd 00 10` |Load a value into destination register|
|LDR        | d, m    | `mm mm mm mm 00 dd 00 11` |Load a value from memory into destination register|
|LDM        | s, m    | `mm mm mm mm ss 00 01 01` |Load the value in source register into memory|
|ADD        | d, s    | `00 00 00 00 ss dd 10 01` |Add x and y and store the value in x|
|SUB        | d, s    | `00 00 00 00 ss dd 11 01` |Subtract x from y  and store the value in x|
|DIV        | d, s    | `00 00 00 00 ss dd 10 10` |Divide x by y and store the value in x|
|MUL        | d, s    | `00 00 00 00 ss dd 01 10` |Multiply x and y and store the value in x|
|JMP        | m       | `mm mm mm mm 00 00 11 10` |Jump to memory address|
|JLT        | a, b, m | `mm mm mm mm aa bb 01 11` |Jump to memory address if value in source register is less than value in destination register|
|CAL        | m       | `mm mm mm mm 00 00 00 00` |Call a function in memory|
|RET        | -       | `00 00 00 00 00 00 01 00` |Return from function|
|PSH        | s       | `00 00 00 00 ss 00 10 00` |Push the value in source register onto the stack|
|POP        | d       | `00 00 00 00 00 dd 11 00` |Pop the stack into the destination register|
|OUT        | s       | `00 00 00 00 ss 00 10 11` |Output the value in source register|
|HLT        | -       | `00 00 00 00 00 00 11 11` |Program halt|