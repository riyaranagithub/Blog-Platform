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
        defaultValue={defaultValue} // Ensure defaultValue is set
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="n645yplf9gr9ktq86qdyx8ie1mbo0fsbq9rbtj38az4lcd8y" // Your API key
            value={value} // Bind editor value to form control
            init={{
              branding: false,
              height: 500,
              menubar: true,
             
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
            onEditorChange={(newValue) => onChange(newValue)} // Pass new value to onChange
          />
        )}
      />
    </div>
  );
}

export default RTE;
