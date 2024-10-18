import useWorkspace from "@/lib/swr/use-workspace";
import {
  Button,
  Modal,
  SimpleTooltipContent,
  Tooltip,
  useKeyboardShortcut,
} from "@dub/ui";
import { InfoTooltip } from "@dub/ui/src";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";
import { useForm, useFormContext } from "react-hook-form";
import { LinkFormData } from ".";

function AdvancedModal({
  showAdvancedModal,
  setShowAdvancedModal,
}: {
  showAdvancedModal: boolean;
  setShowAdvancedModal: Dispatch<SetStateAction<boolean>>;
}) {
  const id = useId();

  const {
    watch: watchParent,
    getValues: getValuesParent,
    setValue: setValueParent,
  } = useFormContext<LinkFormData>();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Pick<LinkFormData, "externalId" | "identifier">>({
    values: {
      externalId: getValuesParent("externalId"),
      identifier: getValuesParent("identifier"),
    },
  });

  const [externalIdParent, identifierParent] = watchParent([
    "externalId",
    "identifier",
  ]);

  useKeyboardShortcut("a", () => setShowAdvancedModal(true), {
    modal: true,
  });

  const parentEnabled = Boolean(externalIdParent || identifierParent);

  const { conversionEnabled } = useWorkspace();

  return (
    <Modal
      showModal={showAdvancedModal}
      setShowModal={setShowAdvancedModal}
      className="sm:max-w-[500px]"
    >
      <form
        className="px-5 py-4"
        onSubmit={(e) => {
          e.stopPropagation();
          handleSubmit((data) => {
            setValueParent("externalId", data.externalId, {
              shouldDirty: true,
            });
            setValueParent("identifier", data.identifier, {
              shouldDirty: true,
            });
            setShowAdvancedModal(false);
          })(e);
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Advanced Options</h3>
          <div className="max-md:hidden">
            <Tooltip
              content={
                <div className="px-2 py-1 text-xs text-gray-700">
                  Press <strong className="font-medium text-gray-950">A</strong>{" "}
                  to open this quickly
                </div>
              }
              side="right"
            >
              <kbd className="flex size-6 cursor-default items-center justify-center gap-1 rounded-md border border-gray-200 font-sans text-xs text-gray-950">
                A
              </kbd>
            </Tooltip>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          {/* External ID */}
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor={`${id}-external-id`}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                External ID{" "}
                <InfoTooltip
                  content={
                    <SimpleTooltipContent
                      title="A unique identifier for this link in your database."
                      cta="Learn more about external IDs."
                      href="https://d.to/externalId"
                    />
                  }
                />
              </label>
              <Tooltip
                content={
                  <SimpleTooltipContent
                    title="A unique identifier for this link in your system."
                    cta="Learn more about external IDs."
                    href="https://dub.co/help/article/external-ids"
                  />
                }
              />
            </div>
            <div className="mt-2 rounded-md shadow-sm">
              <input
                id={`${id}-external-id`}
                type="text"
                placeholder="Eg: 123456"
                className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                {...register("externalId")}
              />
            </div>
          </div>

          {/* Identifier */}
          {conversionEnabled && (
            <div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor={`${id}-identifier`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Identifier
                </label>
                <InfoTooltip
                  content={
                    <SimpleTooltipContent
                      title="A unique string to identify this link."
                      cta="Learn more about identifiers."
                      href="https://dub.co/help/article/link-identifiers"
                    />
                  }
                />
              </div>
              <div className="mt-2 rounded-md shadow-sm">
                <input
                  id={`${id}-identifier`}
                  type="text"
                  placeholder="Eg: david"
                  className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  {...register("identifier")}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            {parentEnabled && (
              <button
                type="button"
                className="text-xs font-medium text-gray-700 transition-colors hover:text-gray-950"
                onClick={() => {
                  setValueParent("externalId", null, { shouldDirty: true });
                  setValueParent("identifier", null, { shouldDirty: true });
                  setShowAdvancedModal(false);
                }}
              >
                Remove advanced options
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              text="Cancel"
              className="h-9 w-fit"
              onClick={() => setShowAdvancedModal(false)}
            />
            <Button
              type="submit"
              variant="primary"
              text="Save"
              className="h-9 w-fit"
              disabled={!isDirty}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export function useAdvancedModal() {
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);

  const AdvancedModalCallback = useCallback(() => {
    return (
      <AdvancedModal
        showAdvancedModal={showAdvancedModal}
        setShowAdvancedModal={setShowAdvancedModal}
      />
    );
  }, [showAdvancedModal, setShowAdvancedModal]);

  return useMemo(
    () => ({
      setShowAdvancedModal,
      AdvancedModal: AdvancedModalCallback,
    }),
    [setShowAdvancedModal, AdvancedModalCallback],
  );
}
