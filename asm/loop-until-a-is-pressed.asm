;PRT 'Waiting for the 'a' key to be pressed...\n'
LDV A, 97
LDV B, 0

LDV16 C, :loop

:loop
  SYS 1, B, 0
  JNE B, C

SYS 0, B, 1
HLT

:end