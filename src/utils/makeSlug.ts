import * as removeAccents from "remove-accents";

function makeSlug(text: string, removeHtmlTags?: boolean, prepositions?: string[]): string {
	let slug = text.toLowerCase();

	if (removeHtmlTags) {
		slug = slug.replace(/<[^>]*>/g, " ");
	}

	slug = removeAccents(slug)
		.normalize("NFD")
		.replace(/[!%.'$()*+;=?\\,:#@"\\[\]_\/“”÷°©®℗™ªº–—©®℗¦|™‹›»«’]/g, " ");

	if (prepositions && prepositions.length) {
		const prepositionsRegex: RegExp = new RegExp(
			prepositions.map((preposition) => `\\b${preposition.toLocaleLowerCase().trim()}\\b`).join("|"), 'gmi'
		);
		slug = slug.replace(prepositionsRegex, " ");
	}

	slug = slug.trim().replace(/(\s+)/g, "-").replace(/\-+/g, "-");

	return slug;
}

export default makeSlug;

