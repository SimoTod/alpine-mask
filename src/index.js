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

const valueChangedCallback = (el) => {
    return (event) => {
        if (!el._x_model) {
            return
        }

        el._x_model.set(event.target.rawValue)
    }
}

export default function (Alpine) {
    Alpine.magic('mask', (el) => {
        if (el.__cleave) {
            return el.__cleave
        }
    })

    Alpine.directive('mask', (el, { modifiers, expression }, { effect, evaluate }) => {
        if (el._x_model) {
            // Find the model directive (due to modifiers, we don't know the name upfront)
            // and remove the default behaviours
            const directive = Alpine.prefixed('model')
            Object.keys(el._x_attributeCleanups).forEach(key => {
                if (key.startsWith(directive)) {
                    el._x_attributeCleanups[directive][0]()
                    delete el._x_attributeCleanups[directive]
                }
            })
            el._x_forceModelUpdate = () => {}
        }

        const config = modifiers.length === 0
            ? {
                ...evaluate(expression),
                onValueChanged: valueChangedCallback(el),
            }
            : {
                ...buildConfigFromModifiers(modifiers, expression, evaluate),
                onValueChanged: valueChangedCallback(el),
            }

        if (!el.__cleave) {
            el.__cleave = new Cleave(el, config)
        }

        if (el._x_model) {
            effect(() => {
                Alpine.mutateDom(() => el.__cleave.setRawValue(el._x_model.get()))
            })
        }
    })
}
