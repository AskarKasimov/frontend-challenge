import { createContext, useContext } from "react";
import { CatsRepositoryImpl } from "@/data/repository/CatsRepositoryImpl";
import { FavoritesLocalStorageRepository } from "@/data/repository/FavoritesLocalStorageRepository";
import type { ICatsRepository } from "@/domain/repository/CatsRepository";
import type { IFavoritesRepository } from "@/domain/repository/FavoritesRepository";

type Repositories = {
  catsRepository: ICatsRepository;
  favoritesRepository: IFavoritesRepository;
};

const RepositoriesContext = createContext<Repositories | null>(null);

export const RepositoriesProvider = ({
  children,
  repositories,
}: {
  children: React.ReactNode;
  repositories?: Partial<Repositories>;
}) => {
  const defaultRepositories: Repositories = {
    catsRepository: new CatsRepositoryImpl(),
    favoritesRepository: new FavoritesLocalStorageRepository(),
    ...repositories,
  };

  return (
    <RepositoriesContext.Provider value={defaultRepositories}>
      {children}
    </RepositoriesContext.Provider>
  );
};

export const useRepositories = () => {
  const context = useContext(RepositoriesContext);
  if (!context) {
    throw new Error(
      "useRepositories must be used within a RepositoriesProvider",
    );
  }
  return context;
};
