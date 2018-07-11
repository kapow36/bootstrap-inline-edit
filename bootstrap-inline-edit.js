(function ($)
{
    $.fn.bootstrapInlineEdit = function (action, changeEvent, successFunc, errorFunc)
    {
        if (action instanceof jQuery || typeof action === "function")
        {
            if (action instanceof jQuery)
            {
                if (action.is("form"))
                {
                    action.off("submit").on("submit", function (event, element)
                    {
                        if (!element)
                        {
                            throw "Action form was called from unknown source";
                        }

                        event.preventDefault();

                        $.ajax({
                            url: $(this).attr("action"),
                            method: $(this).attr("method"),
                            data: $(this).serialize(),
                            async: true,
                            cache: false,
                            useGlobalLoader: false,
                            success: function ()
                            {
                                success(element);
                            },
                            error: function ()
                            {
                                error(element);
                            }
                        });
                    });
                }
                else
                {
                    throw "Action element is not a form";
                }
            }

            return this.each(function ()
            {
                var _this = $(this);

                if (_this.is("textarea,input[type=color],input[type=date],input[type=datetime-local],input[type=email],input[type=month],input[type=number],input[type=password],input[type=tel],input[type=text],input[type=time],input[type=url],input[type=week]"))
                {
                    _this.blur(function ()
                    {
                        triggerChange(_this);
                    });
                }
                else if (_this.is("input[type=checkbox],input[type=radio],select"))
                {
                    _this.change(function ()
                    {
                        triggerChange(_this);
                    });
                }
                else
                {
                    throw "BootstrapInlineEdit must be a valid input, textare or select type.";
                }
            });
        }
        else if (action === "success")
        {
            success(this);
        }
        else if (action === "error")
        {
            error(this);
        }
        else
        {
            throw action + " does not exist for $.bootstrapInlineEdit()";
        }

        return this;

        function triggerChange(element)
        {
            changeEvent(element);

            if (action instanceof jQuery)
            {
                action.closest("form").trigger("submit", [element]);
            }
            else
            {
                action();
            }
        }

        function success(element)
        {
            element.removeClass("inline-edit-success");
            element.removeClass("inline-edit-error");
            setTimeout(function ()
            {
                element.addClass("inline-edit-success");
            }, 0);

            if (typeof successFunc === "function")
            {
                successFunc(element);
            }
        }

        function error(element)
        {
            element.removeClass("inline-edit-success");
            element.removeClass("inline-edit-error");
            setTimeout(function ()
            {
                element.addClass("inline-edit-error");
            }, 0);

            if (typeof errorFunc === "function")
            {
                errorFunc(element);
            }
        }
    };
}(jQuery));
