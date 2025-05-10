import { Container } from "@mui/material";
import React from "react";
import ReCard from "../components/card.jsx";
import Grid from '@mui/material/Grid';




const HomePage = () => {
return (
<div>
	<Container sx={{mt:2}}> 
		<Grid container gap={2}>
			<Grid item size={{ xs: 12, sm: 9 ,md:6  ,lg:3}}>
				<ReCard />
			</Grid>
		</Grid>
	</Container>
</div>
);
}

export default HomePage;