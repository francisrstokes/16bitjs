LDV B, 7
LDM B, counter:
LDM B, result:

LDV A, factorial:
CAL A

; Print result
LDV A, 0
LDR B, result:
LDV C, 0
SYS

; Print newline
LDV B, 10
LDV C, 3
SYS
HLT

factorial:
  LDR A, counter:
  PSH A

  ; Print counter
  MOV B, A
  LDV A, 0
  LDV C, 0
  SYS

  POP A
  LDV B, 3
  LDV D, done:
  JLT B, D
  PRT ' * '

  MOV B, A
  DEC B

  LDR C, result:
  MUL C, B

  LDM C, result:
  LDM B, counter:

  LDV A, factorial:
  JMR A

  done:
    PRT ' = '
    RET

; These instructions will be overwritten, and are only there to allow named memory locations
counter:
  RET
result:
  RET