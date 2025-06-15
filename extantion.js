

(function (_Scratch) {
    const {ArgumentType, BlockType, TargetType, Cast, translate, extensions, runtime} = _Scratch;

    translate.setup({
        zh: {
            'extensionName': '我的扩展 demo',
            'reporterBlock': '[TEXT]的第[LETTER_NUM] 个字母',
            'myReporter.TEXT_default': 'abcdefg'
        },
        en: {
            'extensionName': 'ext demo',
            'reporterBlock': 'letter [LETTER_NUM] of [TEXT]',
            'myReporter.TEXT_default': 'abcdefg'
        }
    });
    class MyExtension {
        constructor (_runtime) {
 
            this._runtime = _runtime;
        }

        getInfo () {

            const reportBlock = {
                
                opcode: 'getLetterByIndexFromText',
        
                blockType: BlockType.REPORTER,
        
                text: translate({id: 'reporterBlock'}),
        
                arguments: {
                  
                    LETTER_NUM: {
                        type: ArgumentType.NUMBER,
        
                        defaultValue: 1
                    },
        
                    TEXT: {
                        type: ArgumentType.STRING,
                        defaultValue: translate({id: 'myReporter.TEXT_default'})
                    }
                }

            };
        
            return {
               
                id: 'someBlocks',
                color1: '#FF8C1A',
                color2: '#DB6E00',
        
                name: translate({id: 'extensionName'}),
        
                blocks: [reportBlock],
        
              
                menus: {
                    
                    menuA: {
                        acceptReporters: true,
        
                        items: [/* ...*/] || 'getItemsForMenu'
                    }
                }
            };
        }

        getItemsForMenu () {
            return [{text: '1', value: 1}];
        }

        getLetterByIndexFromText (args) {
            const {LETTER_NUM = 0, TEXT = ''} = args;
            const idx = Cast.toNumber(LETTER_NUM);
            const text = Cast.toString(TEXT);
            if (idx < 0 || idx >= text.length) {
                return '';
            }
            return text.charAt(idx);
        }
    }

    extensions.register(new MyExtension(runtime));

}(Scratch));

