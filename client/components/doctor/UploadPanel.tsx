import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, File } from "lucide-react";

export type MedFile = { name: string; size: number; type: string; url: string };

export default function UploadPanel() {
  const [files, setFiles] = useState<MedFile[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = Array.from(e.target.files || []).map((file) => ({ name: file.name, size: file.size, type: file.type || "", url: URL.createObjectURL(file) }));
    setFiles((prev) => [...prev, ...f]);
  };

  const pdf = useMemo(() => files.find((f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")), [files]);

  return (
    <div className="glass rounded-xl p-4 border border-white/10 space-y-3">
      <div className="text-sm text-muted-foreground">Upload reports (PDF) or imaging (DICOM .dcm/.zip)</div>
      <div className="flex items-center gap-2">
        <input ref={inputRef} type="file" multiple onChange={onPick} accept="application/pdf,.pdf,application/dicom,.dcm,.zip" className="hidden" />
        <Button onClick={() => inputRef.current?.click()}>
          <Upload className="h-4 w-4" /> Select files
        </Button>
      </div>
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">Selected files</div>
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="flex items-center gap-2 text-sm">
                  {f.type.includes("pdf") || f.name.toLowerCase().endsWith(".pdf") ? <FileText className="h-4 w-4 text-aqua" /> : <File className="h-4 w-4 text-violet" />}
                  <span>{f.name}</span>
                  <span className="text-xs text-muted-foreground">({(f.size/1024/1024).toFixed(2)} MB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <a className="text-sm underline" href={f.url} target="_blank" rel="noreferrer">Open</a>
                  <a className="text-sm underline" href={f.url} download>
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {pdf && (
            <div className="rounded-lg overflow-hidden border border-white/10">
              <iframe src={pdf.url} className="w-full h-72" title="PDF preview" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
