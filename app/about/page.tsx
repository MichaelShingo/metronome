import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import LinkButton from './LinkButton';

const paragraphStyles = {
	marginTop: '10px',
	marginBottom: '20px',
	lineHeight: '1.8rem',
};

const h4Styles = {
	fontSize: '1.3rem',
	textTransform: 'uppercase',
	marginTop: '20px',
	marginBottom: '0px',
};

const About = () => {
	return (
		<Box
			sx={{
				height: 'fit-content',
				paddingBottom: '100px',
				textAlign: 'justify',
			}}
		>
			<Typography variant="h1" sx={{ fontSize: '5rem' }}>
				Online Metronome
			</Typography>
			<Box sx={{ paddingInline: '24%', height: 'fit-content' }}>
				<Link href="/">
					<LinkButton />
				</Link>
				<Typography variant="h2" sx={{ fontSize: '2.8rem' }}>
					Why Use a Metronome
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Musicians, regardless of their level of expertise, can benefit immensely from
					incorporating a metronome into their practice routines. Serving as a steadfast
					rhythmic guide, the metronome cultivates a musician&lsquo;s sense of timing,
					precision, and consistency. By practicing with a metronome, musicians can refine
					their ability to play in tempo, ensuring that their performances maintain a
					steady rhythm and flow seamlessly. Moreover, the metronome aids in the
					development of internal timing and pulse, essential skills for ensemble playing
					and musical communication. <br></br>
					<br></br>For beginners, the metronome provides a structured framework for
					learning new pieces and building foundational rhythm skills. Intermediate and
					advanced players can use the metronome to challenge themselves with increasingly
					complex rhythms and tempos, pushing the boundaries of their musicality. Whether
					practicing scales, exercises, or intricate compositions, the metronome serves as
					a reliable tool for honing rhythmic accuracy and enhancing overall musical
					proficiency. Ultimately, by integrating the metronome into their practice
					sessions, musicians can unlock their full potential, elevating their
					performances to new heights of precision, expression, and musicality.
				</Typography>
				<Typography variant="h2" sx={{ fontSize: '2.8rem' }}>
					Practice Tips
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					1. Start Slowly
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Begin practicing a passage at a tempo where you can comfortably play it
					accurately. Gradually increase the tempo as you become more confident, using the
					metronome to maintain steady progress.
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					2. Use Subdivisions
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Set the metronome to subdivide the beat into smaller units (e.g., eighth notes,
					triplets) to improve rhythmic precision and internalize complex rhythms.{' '}
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					3. Focus on Accuracy
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Pay close attention to how your notes align with the metronome clicks. Aim for
					each note to land precisely on the beat, ensuring tight synchronization between
					your playing and the metronome.
				</Typography>

				<Typography variant="h4" sx={h4Styles}>
					4. Experiment with Different Tempos
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Practice at various tempos to develop flexibility and control over different
					musical styles and speeds. Slow tempos can help refine technique, while faster
					tempos challenge your dexterity and agility.{' '}
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					5. Practice with Dynamic Markings
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Use the metronome to practice dynamics, gradually increasing or decreasing the
					volume of your playing in sync with the metronome&lsquo;s tempo.
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					6. Record Yourself
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Record your practice sessions with the metronome to track your progress over
					time. Listen back to identify areas for improvement and adjust your practice
					accordingly.
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					7. Stay Relaxed
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Avoid tensing up or rushing to keep up with the metronome. Focus on maintaining
					a relaxed and steady tempo, allowing your playing to flow naturally.
				</Typography>
				<Typography variant="h2" sx={{ fontSize: '2.8rem' }}>
					Features
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					A metronome created by a musician. As a violinist and pianist, I often found
					metronome applications to be lacking in one way or another. They would get the
					job done in terms of keeping the beat, but perhaps the UI was not well designed,
					it was missing some features, or it was not that intuitive to use. When I built
					this web metronome app, I wanted to take all the features that I liked from
					other metronomes and put them in one place. I also wanted to make the metronome
					accessible to all, regardless of operating system or device. As a teacher, when
					I would ask my students to use a metronome or drone to practice, it would be
					difficult to recommend a specific application, because some have a smart phone,
					some do not, some use iOS, and others may be on Android. This app is the
					one-stop solution for all devices and musical needs.<br></br>
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					Flash on Beat
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Sometimes, it is difficult to hear the metronome, given the volume of your
					instrument or the instruments playing around you. Other times, you may want to
					keep the metronome on silent, while having a very clear visual indication of the
					beat. The Flash on Beat feature exists for this reason, flashing the entire
					screen on every beat.
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					Pitch Drone for Tuning
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					For strings and winds, tuning and intonation is a constant concern, and it is
					important for students to develop their ear early on. The pitch drone feature
					that is included with this metronome can be used to tune an instrument, or
					practice a passage in a particular key. For example, if a musician is playing a
					C major scale, it is helpful to set the drone to a C or a G and tune the notes
					of the scale against the drone.
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					Keyboard Shortcuts
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					For musicians that want to use a metronome on their laptop or desktop computer,
					the wide array of keyboard shortcuts that this metronome app provides can speed
					up various commands. Everything from starting and stopping the metronome to
					adjusting the number of polyrhythm beats is linked to a convenient keyboard
					shortcut, making most of the metronome controllable from the keyboard.
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					Polyrhythms
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					For advanced musicians, especially pianists and percussionists that have to
					perform complex polyrhythms in their music, the metronome&lsquo;s polyrhythm
					feature is a great practice tool. With support for up to 21 main beats and 15
					secondary beats, the cross-rhythm combinations are numerous. Furthermore, this
					metronome allows for sound customization and beat accent adjustment on the
					polythyhm beat, giving great flexibility in timbre.
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					Subdivisions
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Subdivisions are helpful for practicing more intricate rhythms in slower pieces,
					or ensuring that the notes within each beat are placed accurately. Miitronome
					supports various subdivisions up to quintuplets.
				</Typography>
				<Typography variant="h4" sx={h4Styles}>
					Custom Beat Accents
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					The metronome provides an easily accessible way to adjust the accent on each
					beat with three possible levels. This adjustment can be performed on both the
					main beat and the cross-rhythm beat.
				</Typography>

				<Typography variant="h4" sx={h4Styles}>
					Tap Tempo
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					Often, a musician won&lsquo;t know the exact tempo of a song, so it is helpful
					to be able to tap along to what they hear. This feature can be accessed by
					tapping on the BPM indication (the big number at the top), or tapping the
					&quot;T&quot; key on the keyboard.
				</Typography>
				<Typography variant="h2" sx={{ fontSize: '2.8rem' }}>
					About the Developer
				</Typography>
				<Typography variant="body1" sx={paragraphStyles}>
					This application is developed by Michael Shingo Crawford, a software developer
					and violinist. View his{' '}
					<Link
						style={linkStyles}
						href="https://portfolio.michaelshingo.com/"
						target="_blank"
					>
						portfolio
					</Link>{' '}
					and{' '}
					<Link style={linkStyles} href="https://michaelshingo.com/" target="_blank">
						music website
					</Link>
					.
				</Typography>
				<Image
					src="/navyYardProfileSmall.jpg"
					alt="Michael Shingo Crawford, a musician, violinist, and software developer and web developer who created this Online Metronome Application."
					width={200}
					height={303.25}
				/>
			</Box>
		</Box>
	);
};

const linkStyles = { color: 'white' };

export default About;
