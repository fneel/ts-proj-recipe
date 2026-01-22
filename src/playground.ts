


//I/O (Input/Output) 
//räcker att använda async när vi använder/hämtar något utanför vår app
async function skeletonFunction(): Promise<string>{

    try {
        console.log("Startar");

        //Här skulle fetch ligga
        const data = await someAsyncOperation();

        return data;
    } catch (error) {

        console.error("Ett fel inträffade:", error);
        return "";
    }
}