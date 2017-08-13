.data
  .starting_values string "A = 10, B = 20\n"
  .result_a string "A = "
  .result_b string ", B = "
.text
  .global main:

main:
  ;; Print stating values
  mvi a, 0
  mvi b, .starting_values
  mvi c, 4
  sys

  ;; Swap values
  mvi a, 10
  mvi b, 20
  swp a, B

  ;; Print results
  psh b
  psh a

  mvi a, 0
  mvi b, .result_a
  mvi c, 4
  sys

  pop b
  mvi c, 0
  sys

  mvi a, 0
  mvi b, .result_b
  mvi c, 4
  sys

  pop b
  mvi c, 0
  sys

  hlt