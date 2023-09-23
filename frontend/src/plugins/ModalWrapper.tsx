import type { CustomModalOptions } from "./modal";
import { FormKit } from "@formkit/vue";
import { Modal } from "jenesius-vue-modal";
import type { WrapComponent } from "jenesius-vue-modal/dist/types/types/types";
import { defineComponent } from "vue";

const ModalWrapper = <P extends WrapComponent>(component: P | string, props?: any, options?: Partial<CustomModalOptions>) => {
    return defineComponent({
        name: "ModalWrapper",
        render() {
            return (
                <div class="flex flex-col fixed top-0 bottom-0 left-0 right-0 h-full w-full md:h-auto md:w-auto transform text-left shadow-xl transition-all md:relative md:min-w-[30%] md:max-w-2xl md:shadow-none md:transform-none sm:align-middle text-gray-900 dark:text-white">
                    {/* Header */}
                    {!options?.disableHeader ? (
                        <div class="flex items-center bg-white pl-6 p-3 dark:bg-gray-800 justify-between p-4 border-b dark:border-gray-600 rounded-t">
                            <h3 class="text-xl align-center font-semibold text-gray-900 dark:text-white">
                                {/* Title */}
                                {options?.title && typeof options.title === "string" ? options.title : null}
                            </h3>
                            {/* Close Button */}
                            {!options?.disableCloseButton ? (
                                <button onClick={() => this.$emit(Modal.EVENT_PROMPT, false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i class="fa-solid fa-times text-xl"></i>
                                </button>
                            ) : null}
                        </div>
                    ) : null}
                    {/* Body */}
                    <div class="bg-white p-6 dark:bg-gray-800 p-6 space-y-6 flex-grow">
                        {/* String or Component */}
                        {typeof component === "string" ? <p>{component}</p> : <component {...props} />}
                    </div>
                    {/* Footer */}
                    {!options?.disableFooter ? (
                        <div class="flex items-center justify-end bg-white p-6 dark:bg-gray-800 p-6 space-x-2 border-t border-gray-200 dark:border-gray-600 rounded-b">
                            {options?.buttons?.map((button) => (
                                <FormKit type="button" classes={button.classes as any} onClick={() => button.onClick!} key={button.text}>
                                    {button.text}
                                </FormKit>
                            ))}
                            {options?.enableConfirmButton ? (
                                <FormKit type="button" onClick={() => this.$emit(Modal.EVENT_PROMPT, true)}>
                                    {options?.confirmButtonText ?? "Confirm"}
                                </FormKit>
                            ) : null}
                            {!options?.disableCancelButton ? (
                                <FormKit type="button" classes={{ input: "!bg-secondary" }} onClick={() => this.$emit(Modal.EVENT_PROMPT, false)}>
                                    {options?.cancelButtonText ?? "Cancel"}
                                </FormKit>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            );
        },
    });
};

export default ModalWrapper;