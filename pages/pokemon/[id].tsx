import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export async function getStaticPaths(): Promise<any> {
    return {
        paths: Array.from(Array(899).keys()).map((id) => ({
            params: {
                id: id.toString(),
            },
        })),
        fallback: false,
    };
}

export async function getStaticProps({params}: {params: {id: string}}) {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.id}`,
    );
    const pokemonData = await response.json();

    console.log("fetched poke data", pokemonData);

    return {
        props: {
            pokemonData,
        },
    };
}

export default function PokemonPage({pokemonData}: any) {
    const pokemonType1 = pokemonData.types[0]?.type.name.toUpperCase();
    const pokemonType2 = pokemonData.types[1]?.type.name.toUpperCase();

    return (
        <>
            <Head>
                <title>Pokémon {pokemonData.id}</title>
            </Head>
            <main>
                <Image
                    width={500}
                    height={500}
                    src={
                        pokemonData.sprites.other["dream_world"]
                            .front_default ||
                        pokemonData.sprites.other["official-artwork"]
                            .front_default
                    }
                />
                <h1>
                    This Pokémon's name is {pokemonData.name.toUpperCase()}!
                </h1>
                <h3>
                    It's a Pokémon that is {pokemonType1}-type
                    {pokemonType2 ? ` and ${pokemonType2}-type` : ""}.
                </h3>
                <h2>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </h2>
            </main>
        </>
    );
}
