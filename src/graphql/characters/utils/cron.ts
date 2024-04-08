import cron from 'node-cron';
import { updateCharacter } from './get_character_from_api';

let isCronJobRunning = false;
const cronSchedule = '0 */12 * * *';

// Run the cron job every 12 hours
const cronJob = cron.schedule(cronSchedule, async () => {

    isCronJobRunning = true;

    try {
        await updateCharacter();
        console.log('Cron job executed successfully.');
    } catch (error) {
        console.error('Error executing cron job:', error);
    } finally {
        isCronJobRunning = false;
    }
}, {
    scheduled: true,
    timezone: 'America/Bogota'
});


cronJob.start();


export { cronJob };

// If you want to stop the cron job programmatically, you can call `cronJob.stop()`
// cronJob.stop();
