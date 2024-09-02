import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
          key={defaultValue}
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar: [
                "undo redo | styles | bold italic | link image",
                "alignleft aligncenter alignright",
              ],
              content_style: `
                body { font-family: Arial, sans-serif; font-size: 16px; }
                h1 { font-size: 24px; margin-bottom: 16px; }
                p { margin-bottom: 12px; }
                a { color: #1e90ff; text-decoration: none; }
                a:hover { text-decoration: underline; }
              `,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
