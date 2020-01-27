import React from "react";
import {withRouter} from "react-router";
import {TranslatableText} from "../App";

class Repertoire extends React.Component {
    render() {
        return <div className="page">
            <div className="block">
                <br/>
                <div className="text">
                    <pre>
                                <p className="title">
                                    <TranslatableText dictionary={{
                                        EN: "Repertoire",
                                        RU: "Репертуар",
                                        CH: "Repertoire",
                                    }}/>
                                </p>
                                <br/>
                                <p className="subtitle">A</p> <br/>
A. Celentano "Confessa"<br/>
A. C. Jobim "The girl from ipanema"<br/>
Adele "Rolling in the deep"<br/>
Adele "Skyfall"<br/>
Adele "Someone like you"<br/>
A. Dvorak "Humoresque"<br/>
Anne-Marie "Rockabay"<br/>
A. Kent "The end of the world"<br/>
A. Koci "Sweet but psycho"<br/>
A. Levine "Moves like Jagger"<br/>
A. Levine "Girls like you"<br/>
A. Piazzolla "Libertango"<br/>
A. Piazzolla "Oblivion"<br/>
A. Piazzolla "Duo"A. Rybnikov soundtrack from rock-opera "Join y Avos"<br/>
Arr. Aleinikov "Oriental woman"<br/>
Arr. Norio "Mix club"<br/>
A. Rybak "Fairtale"<br/>
A. Rybnikov "The stairways to the sky"<br/>
A. Safina "Luna tu"<br/>
Arr. Skyrecon "Jingle bell rock"<br/>
A. Vivaldi. Four seasons. STORM.<br/>
A. Vivaldi .Four seasons. WINTER<br/>
A. Walker "Faded"<br/>
A. L. Weber "The phantom of the opera"<br/>
A. L. Weber "Memory"<br/><br/>
                        <p className="subtitle">B</p><br/>
B. Crewe "Can't Take My Eyes Off You"<br/>
B. Howard "Fly me to the Moon"<br/>
B. Kaempfert "Strangers in the night"<br/>
B. May "We will rock you"<br/>
B. May "We are the champions"<br/><br/>
                        <p className="subtitle">C</p><br/>
C. Ailin "New rules"<br/>
C. Cabello "Havana"<br/>
C. Gardel "Por una cabeza"<br/>
Ch. Chaplin "Smile"<br/>
Ch. Perry "A thousand years"<br/>
Ch. Puth "Attention"<br/>
C. Saent-Sant "My heart at theThy sweet voice"<br/>
C. M. Schoonberg "I dreamed a dream"<br/>
C. Velazquez "Besame mucho"<br/><br/>
                        <p className="subtitle">D</p><br/>
D. Guetta "Dangerous"<br/>
D. Guetta "Without you"<br/>
D. Kramer "The dancing violinist"<br/>
Dua Lipa "Kiss and make up"<br/>
D. Guetta "Dangerous"<br/>
D. Reynols "Believer"<br/>
D. Taylor "Jimmy acha"<br/><br/>
                        <p className="subtitle">E</p><br/>
E. Ahbez "Nature boy"<br/>
E. Buendia "El bimbo"<br/>
E. Ch. Sheeran "Shape of you"<br/>
E. Ch. Sheeran "Thinking out loud"<br/>
E. Ch. Sheeran "Perfect"<br/>
E. Elgar "Salut d'amour"<br/>
E. Di Capua "O sole mio"<br/>
E. Grieg "Solveig's leed"<br/>
E. Grieg "Anitra's dance"<br/>
E. Grieg "In the hall of the mountain king"<br/>
E. Curtiss "Back to Sorriento"<br/>
E. John "Can you feel the love tonight"<br/>
E. Garner "Misty"<br/>
E. Gruber "Silent night"<br/>
E. Morriccone " Le professinale" (french movie)<br/>
E. Plum "Ego"<br/>
E. Ramazzotti "Piu che puoi"<br/><br/>
                        <p className="subtitle">F</p><br/>
F. Andre "Dream a little dream"<br/>
F. Kreisler "Liebesleid"<br/>
F. Sartori "Time to say goodbay"<br/>
F. Shubert "Ave Maria"<br/>
F. Shubert "Serenade"<br/>
F. Van der Heijden "Explosive"<br/><br/>
                        <p className="subtitle">G</p><br/>
G. Bizet "Habanera"<br/>
G. Douglas "What a wonderful world"<br/>
G.Gershwin "Summertime"<br/>
G. Handel "Gavotte"<br/>
G. Lima "Balada boa"<br/>
G. Mancini "Pink panter"<br/>
G. Marks "All of me"<br/>
G. Michael "Last Christmas"<br/>
G. M. Rodriguez "Cumparsita"<br/>
G. Shearing "Lullaby of birdland"<br/>
G. Weiss "Can't help falling in love"<br/><br/>
                        <p className="subtitle">H</p><br/>
H. Arlen "Over the rainbow"<br/>
H. Mancini "Moon river"<br/>
H. Zimmer "He's a pirate"<br/><br/>
                        <p className="subtitle">I</p><br/>
I. Berlin "Cheek to cheek"<br/><br/>
                        <p className="subtitle">J</p><br/>
J. Brahms "Hungarian dance 5"<br/>
J. S. Bach "Air"<br/>
J. Feliciano "Feliz Navivad"<br/>
J. Goldman. Khaled "Aisha"<br/>
J. Horner "My heart will go on"<br/>
J. Kosma "Autumn leaves"<br/>
J. Mandel "The shadow of your smile"<br/>
J. Massenet "Meditation"<br/>
J. Pachelbel "Canon in D"<br/>
J. Patterson "Rather be"<br/>
J. Peterik "Eye of tiger"<br/>
J. Revaux "My way"<br/>
J. Strauss 2 "An der schonen blauen Donau"<br/>
J. White "La bella cubana"<br/>
J. Williams "Theme from Shindler's list"<br/>
J. Y. Park "What is love"<br/><br/>
                        <p className="subtitle">K</p><br/>
K. J. Anderson "Let it go"<br/>
K. Jenkins "Palladio"<br/><br/>
                        <p className="subtitle">L</p><br/>
L. Cohen "Hallelujah"<br/>
Linkin Park "Numb"<br/>
Louiguy "La vie en rose"<br/>
L. Rodriguez "Despacito"<br/>
L. Schifrin "Mission imposible"<br/>
L. Van Beethoven "To Elise"<br/>
L. Van Beethoven "Ode to Joy"<br/><br/>
                        <p className="subtitle">M</p><br/>
M. Batt "Contradanza"<br/>
M. Glover "Destiny"<br/>
M. Jackson "Smooth criminal"<br/>
M. Martin "Love me like you do"<br/>
Mexican folk song "La bamba"<br/><br/>
                        <p className="subtitle">N</p><br/>
N. Paganini " Cantabile"<br/>
M. Posner "Sugar"<br/>
N. Rosa "Samba"<br/>
N. Rota " Father-in-law"<br/>
N. Rota "Theme of love from Romeo and Julet"<br/>
Nirvana "Smells like teen spirit"<br/>
N. Uematsu "To Zanarkand"<br/><br/>
                        <p className="subtitle">P</p><br/>
Palladium<br/>
P. Beltran "Quien sera"<br/>
P. J. McCartney "Let it be"<br/>
P. J. McCartney "Yestarday"<br/>
P.I. Tchaikovsky "Panorama"<br/>
P.I. Tchaikovsky "Flower's valse"<br/>
P.I. Tchaikovsky "Barcarola"<br/>
P.I. Tchaikovsky "Dance of little swan"<br/><br/>
                        <p className="subtitle">Q</p><br/>
Queen "We will rock you"<br/>
Queen "We are the champions"<br/><br/>
                        <p className="subtitle">R</p><br/>
R. Gjawadi " Games of thrones"<br/>
R. Lovland "Moving"<br/>
R. Lovland "The song from a secret garden"<br/>
R. Lovland "Promise"<br/>
R. Wagner "Bridal march"<br/><br/>
                        <p className="subtitle">S</p><br/>
S. Aicioly "Ai se eu te pego"<br/>
S. Fernandes "Eu Quero Tchu, Eu Quero Tcha"<br/>
S. Furler "Cheap trills"<br/>
Sia "Titanium"<br/>
S. Iradier "La paloma"<br/>
S. Rachmaninov "Vocalise"<br/>
S. Smith "Dancing with a stranger"<br/>
Sting "Shape of my heart"<br/><br/>
                        <p className="subtitle">T</p><br/>
T. Oliphant "Deck the halls"<br/>
T. Park "Whistle"<br/>
Traditional belorussian song "Kupalinka"<br/>
Traditional English carol "Greensleeves"<br/>
Traditional English carol "The coventry carol"<br/>
Traditional English carol "We wish you a Merry Christmas"<br/>
Traditional carol "The first Nowell"<br/>
Traditional carol "Oh, Christmas tree<br/>
Traditional russian song "Kalinka"<br/>
Traditional ingushese dance "Lezginka"<br/>
Traditional song "Hava nagila" and 7/40<br/><br/>
                        <p className="subtitle">V</p><br/>
V. Kosma "Le Jouet" (french movie)<br/>
V. E. Kristovsky "Farewell"<br/>
V. Monti "Csardas"<br/>
V.P. Soloviev-Sedoy "Moscow nights"<br/><br/>
                        <p className="subtitle">W</p><br/>
W. Grigahcine "Let me love you"<br/>
W. A. Mozart "Eine kleine night music"<br/>
W. A. Mozart "Rondo alla turca"<br/>
W. Scharf "Ben"<br/><br/>
                        <p className="subtitle">Z</p><br/>
Z. Abreu "Tiko tico"<br/>
Zh. Qiufeng "I love you"<br/>
                            </pre>
                </div>
            </div>
        </div>
    }
}

export default withRouter(Repertoire);