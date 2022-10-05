import React, { useState } from 'react';
import { getTime } from 'date-fns';
import { Button } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons';
import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../GlobalContext';
import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { format } from 'date-fns';

const CreateForm = ({ step, data }) => {
	const { overseers, teachers, setStep, setAction } = useGlobalContext();
	const [toast, setToast] = useState(false);

	const { register, handleSubmit, reset } = useForm({
		defaultValues:
			step === 'updateResit'
				? {
						id: data.id,
						name: data.name,
						exam: data.exam,
						duration: data.duration,
						resitDate: format(data.resitDate, 'dd-MM-yyyy'),
						teacher_id: data.teacher.id,
						overseer_id: data.overseer.id,
				  }
				: {},
	});

	const sendResit = (resit) => {
		fetch('http://localhost:9000/addresit' + (resit.id ? '/' + resit.id : ''), {
			method: resit.id ? 'PUT' : 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...resit, resitDate: getTime(new Date(resit.resitDate)) }),
		}).then(() => {
			setToast(true);
			setAction('created');
			setStep('createResit');
			reset();
		});
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		setTimeout(() => {
			setToast(false);
			setAction('null');
		}, 3000);
	};

	return (
		<>
			<h2 className='text-center text-2xl font-bold mt-8'>{step === 'createResit' ? 'Ajouter un rattrapage' : 'Modifier le rattrapage'}</h2>

			<form onSubmit={handleSubmit(sendResit)} className='bg-white p-10 m-4 rounded'>
				<div className='flex flex-col pb-4'>
					<label className='font-bold text-teal-500'>Nom du Rattrapage</label>
					<input className='p-2 focus:outline-none' placeholder='...' {...register('name')} required />
				</div>
				<div className='flex flex-col pb-4'>
					<label className='font-bold text-teal-500'>Lien vers le PDF de l'examen</label>
					<input className='p-2 focus:outline-none' placeholder='Pick one' {...register('exam')} required />
				</div>
				<div className='flex pb-4'>
					<div>
						<label className='font-bold text-teal-500'>Durée de l'épreuve</label>
						<input className='p-2 focus:outline-none' type='time' step='1' {...register('duration')} required />
					</div>
					<div>
						<label className='font-bold text-teal-500'>Date de l'épreuve</label>
						<input className='p-2 focus:outline-none' type='date' {...register('resitDate')} required />
					</div>
				</div>
				<div className='flex pb-4'>
					<div className='flex flex-col pb-4 pr-8'>
						<label className='font-bold text-teal-500'>Attribuer un enseignant</label>
						<select {...register('teacher_id')} required className='p-2 focus:outline-none'>
							<option selected disabled={true} value=''>
								Choisir...
							</option>
							{teachers.map((teacher) => (
								<option key={teacher.id} value={teacher.id}>
									{teacher.name}
								</option>
							))}
						</select>
					</div>
					<div className='flex flex-col pb-4'>
						<label className='font-bold text-teal-500'>Attribuer un surveillant</label>
						<select {...register('overseer_id')} required className='p-2 focus:outline-none'>
							<option selected disabled={true} value=''>
								Choisir...
							</option>
							{overseers.map((overseer) => (
								<option key={overseer.id} value={overseer.id}>
									{overseer.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<input type='hidden' value='noef' {...register('status')} />
				<Button type='submit' color='teal' className='bg-teal-500'>
					{step === 'createResit' ? 'Créer Rattrapage' : 'Modifier Rattrapage'}
				</Button>
			</form>
			<Notification
				className={`${toast ? 'top-0' : 'top-[-130px]'} absolute transition duration-300 w-content left-1/2 my-8`}
				onClose={() => {
					setToast(false);
				}}
				icon={<IconCheck size={18} />}
				color='teal'
				title='Nouvel Ajout'>
				Le rattrapage à bien été créé
			</Notification>
			<IconArrowBack
				className='absolute top-28 cursor-pointer hover:text-teal-500 transition duration-200 hover:shadow-teal-500 hover:scale-[.9]'
				size={38}
				onClick={() => {
					setStep('resitsList');
				}}
			/>
		</>
	);
};

export default CreateForm;
