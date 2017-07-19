// Preprocessor
require('./preprocessor/utils');
require('./preprocessor/extract-sections');
require('./preprocessor/stages/cleanup');
require('./preprocessor/stages/inject-entry-point');
require('./preprocessor/stages/replace-data-labels');
require('./preprocessor/stages/replace-labels');
require('./preprocessor/stages/evaluate-expressions');

require('./preprocessor/get-data-table');

// Assembler
require('./assembler/assembler-utils');
require('./assembler/instruction-encoder');
require('./assembler');