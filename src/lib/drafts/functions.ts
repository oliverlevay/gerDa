import type { DocumentType } from '$lib/types';
import { emptyDraft } from './data';
import type { Draft } from './types';

export function importDraft(type: DocumentType, selectedDraft: Draft | null) {
	let currentDraft: Draft = createEmptyDraft(type);
	if (selectedDraft && selectedDraft.draftType === currentDraft.draftType) {
		currentDraft = JSON.parse(JSON.stringify(selectedDraft));
		currentDraft = {
			...createEmptyDraft(type), // The purpose if this is to fill in any missing fields
			...currentDraft
		};
	}
	return currentDraft;
}

export function createEmptyDraft(type: DocumentType): Draft {
	return {
		...emptyDraft,
		draftType: type,
		uuid: Math.random().toString()
	};
}

export function separateDraftsByType(drafts: Draft[]) {
	const result: Record<DocumentType, Draft[]> = {
		motion: [],
		proposition: [],
		'election-proposal': [],
		'requirement-profile': [],
		custom: []
	};

	for (const draft of drafts) {
		result[draft.draftType].push(draft);
	}

	return result;
}
