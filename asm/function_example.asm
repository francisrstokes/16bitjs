# Jump to the start label
LDV A, :start
PSH A
RET

:factorial
  # First store the state of B, C, and D registers in the stack
  PSH B
  PSH C
  PSH D

  PSH A
  LDV C, 1
  MOV D, A

  :f_loop
    # Set B up so we can subtract 1
    LDV B, 1
    # Sub 1, store in B
    SUB B, A
    # Copy B into A. A contains (i-1).
    MOV A, B

    # Pop B to get i
    POP B

    # Push A to store i-1
    PSH A

    # Multiply A and B, storing in A
    MUL A, B
    # Copy A to B. B contains i * (i-1)
    MOV B, A

    # Pop B = i-1
    POP A
    # Push A = i * (i-1)
    PSH B

    # Set B for addition
    LDV B, 1
    ADD C, B

    # Loop if not done
    JLT C, D, :f_loop

  POP A
  POP D
  POP C
  POP B
  RET

:start
  # The factorial function expects it's argument in the A register
  LDV A, 5
  CAL :factorial
  OUT A

  HLT