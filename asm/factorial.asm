LDV B, 7
LDM B, :counter
LDM B, :result

CAL :factorial

LDR A, :result
SYS 0, A, 0
LDV A, 10
SYS 0, A, 3
HLT

:factorial
  LDR A, :counter
  SYS 0, A, 0
  LDV B, 3
  JLT B, :done
  PRT ' * '

  LDV B, 1
  SUBS A, B

  LDR C, :result
  MUL C, B

  LDM C, :result
  LDM B, :counter

  LDV A, :factorial
  PSH A
  RET

  :done
    PRT ' = '
    RET

; These instructions will be overwritten, and are only there to allow named memory locations
:counter
  RET
:result
  RET