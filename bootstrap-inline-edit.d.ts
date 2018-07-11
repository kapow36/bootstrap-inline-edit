interface JQuery
{
    bootstrapInlineEdit(action: string): JQuery;
    bootstrapInlineEdit(action: JQuery, changeEvent?: (element?: JQuery) => void, successFunc?: (element?: JQuery) => void, errorFunc?: (element?: JQuery) => void): JQuery;
    bootstrapInlineEdit(action: void): JQuery;
    autoComplete(options?: BootstrapAutoCompleteOptions): JQuery;
}
