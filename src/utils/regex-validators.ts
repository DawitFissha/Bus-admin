const PhoneNumberRegex = new RegExp('^[0][0-9]+$')
const orgRegEx = new RegExp('^[0-9]+$')
function ValidatePhoneNumber(phoneNumber:string):boolean{
    return PhoneNumberRegex.test(phoneNumber)
}
function ValidateOrgCode(orgCode:string):boolean{
    return orgRegEx.test(orgCode)
}
export {ValidateOrgCode,ValidatePhoneNumber}