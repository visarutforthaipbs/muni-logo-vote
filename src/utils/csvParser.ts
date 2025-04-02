import { Municipality } from "@/types/mongodb";

interface RawMunicipalityData {
  muni_code?: string;
  tao_code?: string;
  mun_name: string;
  amp_name: string;
  cwt_name: string;
  logo: string;
  Website?: string;
  Facebook?: string;
  [key: string]: string | undefined;
}

export const parseCSV = (csvText: string): Municipality[] => {
  const lines = csvText.split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const rawMunicipality: RawMunicipalityData = {
      mun_name: "",
      amp_name: "",
      cwt_name: "",
      logo: "",
    };

    headers.forEach((header, index) => {
      rawMunicipality[header.trim()] = values[index]?.trim() || "";
    });

    // Map the fields to match our MongoDB schema
    const municipality: Municipality = {
      muni_code: rawMunicipality.muni_code || rawMunicipality.tao_code || "",
      mun_name: rawMunicipality.mun_name,
      amp_name: rawMunicipality.amp_name,
      cwt_name: rawMunicipality.cwt_name,
      logo: rawMunicipality.logo,
      voteCount: 0,
      Website: rawMunicipality.Website,
      Facebook: rawMunicipality.Facebook,
    };

    return municipality;
  });
};

export function getUniqueProvinces(municipalities: Municipality[]): string[] {
  return Array.from(
    new Set(
      municipalities
        .map((m) => m.cwt_name)
        .filter((name): name is string => !!name)
        .sort()
    )
  );
}

export function filterMunicipalities(
  municipalities: Municipality[],
  searchTerm: string,
  selectedProvince: string
): Municipality[] {
  return municipalities.filter((m) => {
    const matchesSearch = m.mun_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProvince =
      !selectedProvince || m.cwt_name === selectedProvince;
    return matchesSearch && matchesProvince;
  });
}

export function sortMunicipalities(
  municipalities: Municipality[],
  sortBy: "alphabetical" | "popular"
): Municipality[] {
  return [...municipalities].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.mun_name.localeCompare(b.mun_name, "th");
    } else {
      return (b.voteCount || 0) - (a.voteCount || 0);
    }
  });
}
