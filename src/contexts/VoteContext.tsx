import React, { createContext, useContext, useState } from "react";
import { Municipality } from "@/types/mongodb";
import { useNotification } from "./NotificationContext";

interface VoteContextType {
  municipalities: Municipality[];
  setMunicipalities: React.Dispatch<React.SetStateAction<Municipality[]>>;
  voteForMunicipality: (municipalityId: string) => Promise<boolean>;
  searchMunicipalities: (query: string) => Municipality[];
  displayedMunicipalities: Municipality[];
  hasMore: boolean;
  loadMore: () => void;
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

const ITEMS_PER_PAGE = 12;

export function VoteProvider({ children }: { children: React.ReactNode }) {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const { showNotification } = useNotification();

  const displayedMunicipalities = municipalities.slice(0, displayedCount);
  const hasMore = displayedCount < municipalities.length;

  const loadMore = () => {
    setDisplayedCount((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, municipalities.length)
    );
  };

  const voteForMunicipality = async (
    municipalityId: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ municipalityId }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (
          data.message === "You have already voted for this municipality today"
        ) {
          showNotification(
            "คุณได้โหวตให้เทศบาลนี้ไปแล้วในวันนี้ กรุณารอ 24 ชั่วโมง"
          );
        } else {
          showNotification(data.message || "Failed to vote");
        }
        return false;
      }

      // Update local state with new vote count
      setMunicipalities((prev) =>
        prev.map((m) =>
          m.muni_code === municipalityId
            ? { ...m, voteCount: data.voteCount }
            : m
        )
      );

      showNotification("บันทึกการโหวตเรียบร้อยแล้ว 🎉");
      return true;
    } catch {
      showNotification("เกิดข้อผิดพลาดในการโหวต");
      return false;
    }
  };

  const searchMunicipalities = (query: string): Municipality[] => {
    if (!query) return municipalities;

    const searchTerms = query.toLowerCase().split(" ");
    return municipalities.filter((municipality) => {
      const searchString =
        `${municipality.mun_name} ${municipality.amp_name} ${municipality.cwt_name}`.toLowerCase();
      return searchTerms.every((term) => searchString.includes(term));
    });
  };

  return (
    <VoteContext.Provider
      value={{
        municipalities,
        setMunicipalities,
        voteForMunicipality,
        searchMunicipalities,
        displayedMunicipalities,
        hasMore,
        loadMore,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
}

export function useVote() {
  const context = useContext(VoteContext);
  if (context === undefined) {
    throw new Error("useVote must be used within a VoteProvider");
  }
  return context;
}
