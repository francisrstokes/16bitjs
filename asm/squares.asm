LDV A, :start
PSH A
RET

:calculate_squares
  ADD A, B
  MOV D, A
  MUL D, D
  OUT D
  JLT C, :calculate_squares
  RET

:start
  LDV A, 0
  # Load A (0) into memory location 0xFE
  LDM A, :prog_end

  # Load 1 into B
  LDV B, 1

  # Load the number of iterations into C
  LDV C, 20

  # Store this number at memory location 0xFD
  LDM C, :prog_end

  # Call the calculate squares function
  CAL :calculate_squares

  HLT

:prog_end