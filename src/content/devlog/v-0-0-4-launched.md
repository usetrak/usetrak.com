---
title: v.0.0.4 released
tags: ["release"]
---

## New concept: `work`

Sometimes saying that we are doing a project it's not enough.
Many times a project is split into many activities and budgets.
The tasks may have different deadlines and costs.

For example, you have sold 16 hours of work to a customer at 50€/h.

Another—deeper—example.

You are building a complex service.
You cover many positions in the development of the service.
The customer's budget is split differently in the various phases and kinds of tasks.
So a `work` can be: `Backend January`, `Frontend fixes`, or `Analysis 2`.

So, a `work` is how you track commissions and works inside a project.

You are now able to use the command:

`trak create work <optional_nome-progetto> --hours 16 --from 2023-04-20 --to 2023-05-20 --rate 50`.

Note: The hours will be converted into minutes.

A `work` will be stored like this:

```
[
  {
    "id": "test",
    "name": "Test",
    "time": 123,
    "rate": 12,
    "from_date": "2024-01-01",
    "to_date": "2024-02-02",
    "description": "A description.",
    "done": false,
    "paid": false
  }
]
```

### "done"

At some point, the work ends.

Trak does not automatically mark jobs as completed.
You must use the command `trak works done <work_id> --of <project_id>` to finish them.

This will ensure that that work is no longer shown in the lists and statistics unless there is a flag to specify otherwise.

### "paid"

A work can be considered done but many times this doesn't correlate with the payments.
As a freelance is good to know which works are still to be paid.

Once you are paid you can use the command:

`trak works paid <work_id> --of <project_id>`

### Delete a work

`trak works delete <work-id> --of <project_id>`

### Works in `report` command

When you use `trak report project <project-id> --works`, it shows useful insights about the progression of your work.
It will help you know if you are on track with the work.

- How many days until the deadline?
- How many workable hours until the deadline? (8 hours per day)
- How many hours of work you have already used?
- How much should you charge in a possible mid-term invoice?

## New command: `create`

This is the entry point to create entities:

- session
- project (Note: removed from `projects`.)
- work (Note: More details in the dedicated and projects sections.)

I wanted to centralize the creation of entities in a single command.
It is a choice that improves the readability and discoverability of the entities that can be created without having to inspect every single entity's commands.

Let's see how it will be in the long run.

### Did you forget to start your timer?

Now you can create a session with one command.
Example: `trak create session <nome-progetto> --from 09:00 --hours 3 --minutes 20`

If you omit the project's name, the project list will be displayed.

## `projects`

### Use only configured projects

From now on you can only use configured projects with the CLI commands, apart from `projects list` and `report ...`.

If during the `start` command you use a project that does not exist in the `projects`, an error will be shown.
The intention is to avoid the creation of duplicates and confusion.

### Remove create command

Since the addition of `create` group of commands the `create` command in `projects` doesn't make sense anymore.

### Dedicated folders to projects

Projects until v0.0.3 were stored in `config.json`.
Every project now has a dedicated folder.

The folder should contain:

- The `details.json` file that contains the info that before was in `config.json`
- The `works.json` file that contains the active works
- The `archived_works.json` that contains the closed/finished works

## `report`

Report is a generic command that can cover all entities.
By generic I mean that it's not only about sessions or projects.
Since I don't know the feature I prefer to split its usage into areas, the <what>s.

At the moment `project` is the only viable since it is the one that groups the most useful information.
I'll add new areas as needs arise.
One of the first ideas that came to me is `print`, which creates PDFs for clients.

Let's see how it will be:

### New design

The new design behind this command is:

`trak report <what> <who>`

`what` can be `project`, that is a main area in trak.
`who`, in the case of project, is the project id.

I removed the need for `single` command, now you can use `trak report project <project-id>`.
`trak report projects` (just alias of `trak report project` but syntactically it makes more sense) will show all the projects, you can omit `all`.

The `<project-id>` `all` is now reserved. `trak report project all` shows reports for all projects.

### Readability

Add Total time as the last row to the main table if listing all projects.
Use only tables, instead of boxes—Panels—, to reduce the clutter.

### `details` flag

Added the `-d` `--details` flag to show all the done sessions.
The project's details table won't be shown if there aren't session records

Fix: if missing `end` property, now it shows `🏃 Ongoing` and doesn't trigger errors.

### `works` flag

Added the `--works` flag to show useful insights about a certain work of a project.

(This was the main goal of this release, I'm so proud.)

- `trak report project <project-id> --works` Shows all not "done" works for a specific project.
- `trak report project --works` Shows all not "done" works for all projects.
