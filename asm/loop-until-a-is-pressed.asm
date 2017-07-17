PRT 'Waiting for A key....\n'
LDV A, 97
LDV B, 0

LDV16 C, loop:
LDV16 D, get_input:

loop:
  CAL D
  JNE B, C

HLT

get_input:
  PSH A
  PSH C
  LDV A, 1 ; syscall for stdin
  LDV C, 0 ; mode for output
  SYS      ; initiate system call
  POP C
  POP A
  RET