class WeaponDemoProvider {
  private times: { [id: string]: { start: string; end: string } } = {
    "Arclight": { start: "0", end: "20" },
    "LH86": { start: "20", end: "35" },
    "S-38": { start: "35", end: "52" },
    "Salvo": { start: "52", end: "75" },
    "Coda": { start: "75", end: "94" },
    "Yubarev": { start: "94", end: "112" },
    "C-54": { start: "112", end: "131" },
    "Custodian": { start: "131", end: "163" },
    "Lumin": { start: "163", end: "180" },
    "P8-SC": { start: "180", end: "197" },
    "BR-2": { start: "197", end: "223" },
    "Devastator": { start: "223", end: "298" },
    "Gallant": { start: "298", end: "319" },
    "Karna": { start: "319", end: "356" },
    "P4-AR": { start: "356", end: "379" },
    "S71": { start: "379", end: "401" },
    "Demeco": { start: "401", end: "436" },
    "F55": { start: "436", end: "463" },
    "FS-9": { start: "463", end: "491" },
    "Scalpel": { start: "491", end: "517" },
    "P6-LR": { start: "517", end: "540" },
    "Atzkav": { start: "540", end: "561" },
    "Arrowhead": { start: "561", end: "595" },
    "A03": { start: "595", end: "619" },
    "Animus": { start: "619", end: "639" },
    "Scourge": { start: "639", end: "676" },
    "GP-33": { start: "676", end: "35" },
  };

  GetTimes(name: string): string[] {
    const base = name.split(" ")[0];
    const times = this.times[base];

    if (times === undefined) {
      return ["", ""];
    }

    return [times.start, times.end];
  }
}

export default new WeaponDemoProvider();
