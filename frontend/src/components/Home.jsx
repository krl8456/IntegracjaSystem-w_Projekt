import { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { UserContext } from "../contexts/UserContext";

function Home() {
  const { user } = useContext(UserContext);

  return (
    <Box display="flex" sx={{ marginLeft: 3 }}>
      <Box flex="1">
        <Typography variant="h3" component="p" sx={{ marginBlock: 3 }}>
          Projekt zaliczeniowy z przedmiotu "Integracja Systemów"
        </Typography>
        <Typography variant="h5" component="p" sx={{ marginBlock: 3 }}>
          Temat projektu: Zestawianie danych na temat minionych i trwających
          konfliktów zbrojnych z cenami surowców.
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginBlock: 3 }}>
          Na stronie dostępne są interaktywne wykresy przedstawiające zmiany cen
          poszczególnych towarów i usług, spowodowane inwazją Rosji na Ukrainę.
          Po wybraniu na wykresie miesiąca, w którym trwał konflikt (data
          rozpoczęcia Luty 2021), pojawi się krótka lista wydarzeń z tego
          miesiąca.
        </Typography>
        {user ? (
          <>
            <Typography variant="body2" component="p" sx={{ marginTop: 5 }}>
              Witaj {user.name}, kliknij aby zacząć przeglądać wykresy
            </Typography>
            <Link to={"/chart"}>
              <Button
                color="secondary"
                variant="contained"
                sx={{ marginTop: 1 }}
              >
                Przejdź do wykresów
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Typography variant="body2" component="p" sx={{ marginTop: 5 }}>
              Zarejestruj się lub zaloguj by móc wyświetlić wykresy
            </Typography>
            <Box>
              <Link to={"/register"}>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ marginTop: 1, marginRight: 2 }}
                >
                  Zarejestruj się
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ marginTop: 1 }}
                >
                  Zaloguj się
                </Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Home;
