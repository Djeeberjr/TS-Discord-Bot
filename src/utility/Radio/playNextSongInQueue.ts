import { AudioPlayer } from '@discordjs/voice';
import Queue from './Queue';
import { deleteQueue } from './getSongQueue';
// eslint-disable-next-line import/no-cycle
import VolumeManager from './VolumeManager';

export default async function playNextSongInQueue(player: AudioPlayer, queue: Queue):
Promise<void> {
  if (queue.songs.length > 0) {
    const song = queue.getNextSong();
    const volume = await VolumeManager.get(queue.guildId);
    if (!song.resource) {
      await song.loadResource();
    }
    player.play(song.resource);
    song.resource.volume.setVolume(volume);
  } else {
    console.log('no more songs. stop player');
    queue.setPlaying(false);
    deleteQueue(queue.guildId);
    player.stop();
  }
}
