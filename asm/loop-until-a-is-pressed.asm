LDV A, 97
LDV B, 0

:loop
  SYS 1, B, 0
  JNE B, :loop

SYS 0, B, 1
HLT