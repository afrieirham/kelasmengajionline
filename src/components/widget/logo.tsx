function Logo() {
  return (
    <div className="flex items-center gap-2 font-semibold">
      <img
        src="/favicon.ico"
        width={200}
        height={200}
        className="h-8 w-8"
        alt="Logo Kelas Mengaji Online"
        title="Logo by Atif Arshad on Flaticon"
      />
      <p className="text-sm">Kelas Mengaji Online</p>
    </div>
  );
}

export default Logo;
