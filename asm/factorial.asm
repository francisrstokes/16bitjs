.data
  .counter 8
  .result 8
.text
  .global main:


factorial:
    LDR A, .counter
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

    LDR C, .result
    MUL C, B

    LDM C, .result
    LDM B, .counter

    LDV A, factorial:
    JMR A

    done:
      PRT ' * 1 = '
      RET

main:
  LDV A, factorial:
  CAL A

  ; Print result
  LDV A, 0
  LDR B, .result
  LDV C, 0
  SYS

  ; Print newline
  LDV B, 10
  LDV C, 3
  SYS
  HLT