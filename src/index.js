import Cleave from 'cleave.js'

const findModifierArgument = (modifiers, target, offset = 1) => {
    return modifiers[modifiers.indexOf(target) + offset]
}

const buildConfigFromModifiers = (modifiers, expression, evaluate) => {
    const config = {}

    if (modifiers.includes('card')) {
        config.creditCard = true
        config.creditCardStrictMode = modifiers.includes('strict')
    } else if (modifiers.includes('date')) {
        config.date = true
        config.datePattern = expression ? evaluate(expression) : null
    } else if (modifiers.includes('time')) {
        config.time = true
        config.timePattern = expression ? evaluate(expression) : null
    } else if (modifiers.includes('numeral')) {
        config.numeral = true

        if (modifiers.includes('thousands')) {
            config.numeralThousandsGroupStyle = findModifierArgument(modifiers, 'thousands')
        }

        if (modifiers.includes('delimiter')) {
            config.delimiter = findModifierArgument(modifiers, 'delimiter') === 'dot' ? '.' : ','
        }

        if (modifiers.includes('decimal')) {
            config.numeralDecimalMark = findModifierArgument(modifiers, 'decimal') === 'comma' ? ',' : '.'
        }

        if (modifiers.includes('positive')) {
            config.numeralPositiveOnly = true
        }

        if (modifiers.includes('prefix')) {
            config.prefix = findModifierArgument(modifiers, 'prefix')
        }
    } else if (modifiers.includes('blocks')) {
        config.blocks = evaluate(expression)
    }

    return config
}

let model = null
const valueChangedCallback = (evaluate) => {
    return (event) => {
        if (!model) {
            return
        }

        evaluate(`${model} = ${event.target.rawValue}`)
    }
}

export default function (Alpine) {
    Alpine.magic('mask', (el) => {
        if (el.__cleave) {
            return el.__cleave
        }
    })

    Alpine.directive('mask', (el, { value, modifiers, expression }, { effect, evaluate, evaluateLater }) => {
        if (value === 'model') {
            model = expression

            effect(() => {
                const value = evaluate(expression)

                if (!el.__cleave) {
                    return
                }

                el.__cleave.setRawValue(value)
            })

            return
        }

        const config = modifiers.length === 0
            ? evaluate(expression)
            : {
                ...buildConfigFromModifiers(modifiers, expression, evaluate),
                onValueChanged: valueChangedCallback(evaluate),
            }

        if (!el.__cleave) {
            el.__cleave = new Cleave(el, config)
        }
    })
}
