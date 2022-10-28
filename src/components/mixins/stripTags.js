import { isString } from 'lodash'

export default {
    methods: {
        /**
         *
         * @param {String} str
         * @returns {String}
         */
        stripTags(str) {
            return isString(str) ? str.replace(/<\/?[^>]+>/gi, '') : ''
        }
    }
}
