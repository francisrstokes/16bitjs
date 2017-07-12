LDV A, :start
PSH A
RET

:equal
  PRT 'true\n'
  LDV A, :not_equal_check
  PSH A
  RET

:not_equal
  PRT 'true\n'
  LDV A, 2
  OUT A
  LDV A, :end
  PSH A
  RET

:start
  LDV A, 10
  LDV B, 10
  PRT 'Equal check:'
  JEQ B, :equal
  PRT 'false\n'

:not_equal_check
  LDV A, 11
  LDV B, 10
  PRT 'Not Equal check:'
  JNE B, :not_equal
  PRT 'false\n'

:end
  HLT