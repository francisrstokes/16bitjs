LDV B, 8
LDM B, :counter
LDM B, :result

CAL :factorial

LDR A, :result
OUT 3, A
LDV A, 10
OUT 3, A
HLT

:factorial
  LDR A, :counter
  LDV B, 3
  JLT B, :done

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
    RET

; These instructions will be overwritten, and are only there to allow named memory locations
:counter
  OUT A
:result
  OUT A