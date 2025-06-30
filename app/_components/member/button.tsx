import { Button } from "@/components/ui/button";

// Tombol Batal
export function ButtonBatal(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      className={`border-red-600 text-red-600 font-light hover:bg-red-50 hover:border hover:text-red-700 ${props.className ?? ""}`}
      {...props}
    >
      {props.children ?? "Batal"}
    </Button>
  );
}


export function ButtonPinjam(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={`bg-[#0E4D97] hover:bg-[#0A3A6F] text-white text-sm px-5 py-1 rounded-md shadow ${props.className ?? ""}`}
      {...props}
    >
      {props.children ?? "Pinjam"}
    </Button>
  );
}

export { Button };
