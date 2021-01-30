<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	let columnItems = [
		{
			id: 1,
			name: 'TODO',
			items: [
				{ id: 11, name: 'item1' },
				{ id: 12, name: 'item2' },
				{ id: 13, name: 'item3' }
			]
		},
		{
			id: 2,
			name: 'DOING',
			items: [
				{ id: 14, name: 'item4' },
				{ id: 15, name: 'item5' },
				{ id: 16, name: 'item6' }
			]
		},
		{
			id: 3,
			name: 'DONE',
			items: [
				{ id: 17, name: 'item7' },
				{ id: 18, name: 'item8' },
				{ id: 19, name: 'item9' }
			]
		},
		{
			id: 4,
			name: 'TEST',
			items: [
				{ id: 20, name: 'item10' },
				{ id: 21, name: 'item11' },
				{ id: 22, name: 'item12' }
			]
		}
	];

	const flipDurationMs = 300;
	function handleDndConsiderColumns(e) {
		columnItems = e.detail.items;
	}
	function handleDndFinalizeColumns(e) {
		columnItems = e.detail.items;
	}
	function handleDndConsiderCards(cid, e) {
		const colIdx = columnItems.findIndex((c) => c.id === cid);
		columnItems[colIdx].items = e.detail.items;
		columnItems = [...columnItems];
	}
	function handleDndFinalizeCards(cid, e) {
		const colIdx = columnItems.findIndex((c) => c.id === cid);
		columnItems[colIdx].items = e.detail.items;
		columnItems = [...columnItems];
	}
</script>

<style lang="scss">
	.board {
		height: 90vh;
		width: 100%;
		padding: 0.5em;
		display: flex;
		justify-content: space-around;
		outline:none!important;
		&:focus {
			outline: none;
		}
	}
	.column {
		&:focus {
			outline: none;
		}
		height: calc(100% - 50px);
		flex: 1;
		padding: 0.5em;
		margin: 1em;
		float: left;

		/*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
		overflow-y: hidden;
		> .column-title {
			margin-bottom: 1em;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
		}
		.column-content {
			background-color: #282a2c;
			border-radius: 25px;
	
			> .card {
				&:focus {
					outline: none !important;
				}
				height: 15%;
				width: 100%;
				margin: 0.4em 0;
				display: flex;
				justify-content: center;
				align-items: center;
				color: white;
			}
		}
	}
</style>

<div
	class="board"
	style="outline:none!important;"
	use:dndzone={{ items: columnItems, flipDurationMs, type: 'columns' }}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}>
	{#each columnItems as column (column.id)}
		<div class="column" animate:flip={{ duration: flipDurationMs }}>
			<div class="column-title">{column.name}</div>
			<div
				class="column-content"
				use:dndzone={{ items: column.items, flipDurationMs }}
				on:consider={(e) => handleDndConsiderCards(column.id, e)}
				on:finalize={(e) => handleDndFinalizeCards(column.id, e)}>
				{#each column.items as item (item.id)}
					<div class="card" animate:flip={{ duration: flipDurationMs }} on:click={(e) => console.log(e)}>
						{item.name}
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
