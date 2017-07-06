# 16-bit Javascript VM

## Using the assembler

`node src/assembler -i {infile.asm} -o {outfile.bin}`

## Running a program

`node src -p {program.bin}`

## Instruction table

|Instruction|Arguments|16 bit representation    |
|-----------|---------|-------------------------|
|NOP        | -       | 00 00 00 00 00 00 00 00 |
|MOV        | d, s    | 00 00 00 00 ss dd 00 01 |
|LDV        | d, v    | vv vv vv vv 00 dd 00 10 |
|LDR        | d, m    | mm mm mm mm 00 dd 00 11 |
|LDA        | d, a    | 00 00 00 00 aa dd 01 00 |
|LDM        | s, m    | mm mm mm mm ss 00 01 01 |
|ADD        | d, s    | 00 00 00 00 ss dd 10 01 |
|SUB        | d, s    | 00 00 00 00 ss dd 11 01 |
|MUL        | d, s    | 00 00 00 00 ss dd 01 10 |
|DIV        | d, s    | 00 00 00 00 ss dd 10 10 |
|JMP        | m       | mm mm mm mm 00 00 11 10 |
|JLT        | a, b, m | mm mm mm mm aa bb 01 11 |
|OUT        | s       | 00 00 00 00 ss 00 10 11 |
|HLT        | -       | 00 00 00 00 00 00 11 11 |