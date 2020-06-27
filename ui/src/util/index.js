import * as ValidatorUtils from "./ValidatorUtils";

export {ValidatorUtils};

const GROUP_3_DIGIT_NOT_LAST_REGEX = new RegExp(/(\d)(?=(\d{3})+$)/g);
const MATCH_AND_COMMA = "$1,";

export const formatAmount = (amount) => amount.toString().replace(GROUP_3_DIGIT_NOT_LAST_REGEX, MATCH_AND_COMMA);
export const cutString = (longString, limit) => {
    if (longString && longString.length > 20) {
        return longString.substring(0, limit) + "..."
    }

    return longString;
}